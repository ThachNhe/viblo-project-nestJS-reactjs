import { ConfigService } from '@nestjs/config';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Response } from 'express';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AppDataSource } from '../index';
import { User } from '../entity/User';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  // user register service
  async registerService(body: AuthDTORegister) {
    let hashedPassword = await argon2.hash(body.password);
    const userRepository = AppDataSource.getRepository(User);
    const user = new User();
    user.email = body.email;
    user.password = hashedPassword;
    user.userName = body.userName;
    user.fullName = body.fullName;
    user.avatar = body.avatar;
    try {
      await userRepository.save(user);
      delete user.password;
      delete user.avatar;
      return {
        errCode: 0,
        msg: 'Register success!',
        user: user,
      };
    } catch (error) {
      throw new InternalServerErrorException('User has been existed!');
    }
  }

  // user login service
  async loginService(body: AuthDTOLogin, response: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: [{ email: body.email }, { userName: body.userName }],
      select: ['id', 'email', 'userName', 'fullName', 'avatar', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await argon2.verify(user.password, body.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    delete user.password;
    const accessToken = await this.getAccessToken(user.email, user.id);
    const refreshToken = await this.getRefreshToken(user.email, user.id);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: './',
    });

    return {
      statusCode: 200,
      success: true,
      error: null,
      data: {
        user,
        accessToken: accessToken,
      },
      // ...user,
      // accessToken: Jwt
    };
  }
  // get access token for user
  async getAccessToken(email: string, userId: number) {
    const payload = {
      sub: userId,
      email: email,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '100m',
      secret: this.configService.get('JWT_ACCESS_KEY'),
    });
  }

  // get refresh token for user
  async getRefreshToken(email: string, userId: number) {
    const payload = {
      sub: userId,
      email: email,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '100m',
      secret: this.configService.get('JWT_REFRESH_KEY'),
    });
  }
}
