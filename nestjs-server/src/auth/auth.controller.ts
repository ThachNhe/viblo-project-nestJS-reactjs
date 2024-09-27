import {
  Controller,
  Req,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  LoginResponseDto,
  LogoutResponseDTO,
  RegisterResponseDto,
} from './dto/response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiOkResponse({ type: RegisterResponseDto })
  register(@Body() body: AuthDTORegister) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOkResponse({ type: LoginResponseDto })
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
  // @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: LogoutResponseDTO })
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }
}
