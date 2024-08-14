import { UserService } from './user.service';
import { Controller, Get, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class UserController {

  // @UseGuards(AuthGuard('jwt'))
  // @Get("details")
  // get() {
  //    return "user detail";
  // }
  constructor(private userService: UserService) { }
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getUsers() {
    return this.userService.getUsersService()
  }

}

