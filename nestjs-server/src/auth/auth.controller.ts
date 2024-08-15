import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() body: AuthDTORegister) {
    return this.authService.registerService(body);
  }

  @Post('login')
  login(
    @Body() body: AuthDTOLogin,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!body.email && !body.userName) {
      throw new BadRequestException(
        'Either email or username must be provided',
      );
    }
    return this.authService.loginService(body, response);
  }
}
