import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['accessToken'];
            // console.log('accessToken : ', request.cookies); // Tên cookie chứa accessToken
          }
          return token;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_KEY'),
    });
  }
  validate(payload: any) {
    return { userId: payload.sub };
  }
}
