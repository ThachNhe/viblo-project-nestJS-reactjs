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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/strategy/roles.decorator';
import { UrlDto, UserIdDTO } from './dto/user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsersService();
  }

  @Post('authorize')
  @Roles(Role.User)
  async authorize() {
    return 'authorize';
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUser(@Param('id') userId: UserIdDTO) {
    return this.userService.getUser(userId);
  }

  @Put('/avatar')
  @UseGuards(AuthGuard('jwt'))
  uploadAvatar(@Body() body: UrlDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.userService.uploadAvatar(userId, body?.avatar);
  }
}
