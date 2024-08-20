import { UserService } from './user.service';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/strategy/roles.decorator';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}
  @Get('users')
  async getUsers() {
    return this.userService.getUsersService();
  }

  @Post('authorize')
  @Roles(Role.User)
  async authorize() {
    return 'authorize';
  }
}
