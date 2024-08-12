import { ConfigService } from '@nestjs/config';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }
  async registerService(body: AuthDTORegister) {
    let hashedPassword = await argon2.hash(body.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          userName: body.userName,
          fullName: body.fullName,
          imgURL: body.imgURL
        },
        // select: {
        //    id: true,
        //    email: true,
        //    fullName: true,
        // }
      })
      return {
        errCode: 0,
        msg: 'Register success!',
        user: user
      }
    } catch (err) {
      return {
        errCode: 1,
        msg: 'Register failed!',
        err: err
      };
    }
  }

  async loginService(body: AuthDTOLogin) {

    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: body.email },
          { userName: body.userName },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await argon2.verify(user.password, body.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    delete user.password;
    const Jwt = this.getAccessToken(user.email, user.id);

    return {
      ...user,
      accessToken: Jwt
    }
  }

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
