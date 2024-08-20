import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() body: AuthDTORegister) {
    console.log('check body : ', body);
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

  @Post('refresh-token')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.requestNewAccessToken(req, res);
  }

  @Get('test-authorize')
  authorize() {}

  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}
