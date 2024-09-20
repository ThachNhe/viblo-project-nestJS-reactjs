import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  BadRequestException,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() body: AuthDTORegister) {
    return this.authService.register(body);
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
    return this.authService.login(body, response);
  }

  @Post('refresh-token')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.requestNewAccessToken(req, res);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}
