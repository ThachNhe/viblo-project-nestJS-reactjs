import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/strategy/roles.decorator';
import { UrlDto, UserIdDTO, UserPaginationDTO } from './dto/user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Post('authorize')
  @Roles(Role.User)
  async authorize() {
    return 'authorize';
  }

  @Get('top')
  async getTopUsers(@Query() query: UserPaginationDTO) {
    return this.userService.getTopUsers(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUser(@Param() userId: UserIdDTO) {
    return this.userService.getUser(userId);
  }

  @Put('/avatar')
  @UseGuards(AuthGuard('jwt'))
  uploadAvatar(@Body() body: UrlDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.userService.uploadAvatar(userId, body?.avatar);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  async getUsersService(@Query() query: UserPaginationDTO) {
    return this.userService.getUsersService(query);
  }

  @Put(':id/block')
  @UseGuards(AuthGuard('jwt'))
  blockUser(@Param() id: UserIdDTO) {
    // const { id } = userId;
    return this.userService.blockUser(id);
  }

  @Put(':id/unblock')
  @UseGuards(AuthGuard('jwt'))
  unblockUser(@Param() userId: UserIdDTO) {
    // const { id } = userId;
    return this.userService.unblockUser(userId);
  }
}
