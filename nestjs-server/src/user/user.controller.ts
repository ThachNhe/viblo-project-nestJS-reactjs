import { de } from 'date-fns/locale';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/strategy/roles.decorator';
import { UrlDto, UserIdDTO, UserPaginationDTO } from './dto/user.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  BlockedUserResponseDto,
  DeleteUserResponseDto,
  getUserIdResponseDto,
  GetUsersResponseDto,
  UnBlockedUserResponseDto,
  UploadLoadingResponseDto,
} from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('top')
  @ApiOkResponse({ type: GetUsersResponseDto })
  async getTopUsers(@Query() query: UserPaginationDTO) {
    return this.userService.getTopUsers(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: getUserIdResponseDto })
  @UseGuards(AuthGuard('jwt'))
  getUser(@Param() userId: UserIdDTO) {
    return this.userService.getUser(userId);
  }

  @Put('/avatar')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UploadLoadingResponseDto })
  uploadAvatar(@Body() body: UrlDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.userService.uploadAvatar(userId, body?.avatar);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @ApiOkResponse({ type: GetUsersResponseDto })
  async getUsersService(@Query() query: UserPaginationDTO) {
    return this.userService.getUsersService(query);
  }

  @Put(':id/block')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @ApiOkResponse({ type: BlockedUserResponseDto })
  blockUser(@Param() id: UserIdDTO) {
    // const { id } = userId;
    console.log(id);
    return this.userService.blockUser(id);
  }

  @Put(':id/unblock')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @ApiOkResponse({ type: UnBlockedUserResponseDto })
  unblockUser(@Param() userId: UserIdDTO) {
    return this.userService.unblockUser(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @ApiOkResponse({ type: DeleteUserResponseDto })
  deleteUser(@Param() params: UserIdDTO) {
    console.log(params);
    const userId = params.id;
    return this.userService.deleteUser(userId);
  }
}
