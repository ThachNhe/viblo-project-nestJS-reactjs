import { ConfigService } from '@nestjs/config';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }
  // user register service
  async registerService(body: AuthDTORegister) {
    let hashedPassword = await argon2.hash(body.password);
    // const user = await this.prismaService.user.create({
    //   data: {
    //     email: body.email,
    //     password: hashedPassword,
    //     userName: body.userName,
    //     fullName: body.fullName,
    //     imgURL: body.imgURL
    //   },
    // })

    // return {
    //   errCode: 0,
    //   msg: 'Register success!',
    //   user: user
    // }

  }
  // user login service
  async loginService(body: AuthDTOLogin) {

    // const user = await this.prismaService.user.findFirst({
    //   where: {
    //     OR: [
    //       { email: body.email },
    //       { userName: body.userName },
    //     ],
    //   },
    // });

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // const isValidPassword = await argon2.verify(user.password, body.password);
    // if (!isValidPassword) {
    //   throw new UnauthorizedException();
    // }

    // delete user.password;
    // const Jwt = this.getAccessToken(user.email, user.id);

    // return {
    //   ...user,
    //   accessToken: Jwt
    // }
  }
  // get access token for user
  async getAccessToken(email: string, userId: number) {
    const payload = {
      sub: userId,
      email: email
    }

    return await this.jwtService.signAsync(payload, {
      expiresIn: '100m',
      secret: this.configService.get('JWT_KEY')
    })

  }
}
