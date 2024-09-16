import { ConfigService } from '@nestjs/config';
import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Response, Request } from 'express';
import { Role } from '../enums/role.enum';
import {
  ForbiddenException,
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
    try {
      await userRepository.save(user);
      delete user.password;
      delete user.avatar;
      return {
        statusCode: 200,
        err: null,
        success: true,
        data: {
          user: user,
        },
        msg: 'Register success!',
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // user login service
  async loginService(body: AuthDTOLogin, response: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: [{ email: body.email }, { userName: body.userName }],
      select: [
        'id',
        'email',
        'userName',
        'fullName',
        'avatar',
        'password',
        'roles',
        'isBlocked',
      ],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.isBlocked) {
      throw new ForbiddenException(
        'Your account is blocked. Please contact support.',
      );
    }

    const isValidPassword = await argon2.verify(user.password, body.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    delete user.password;
    delete user.posts;
    delete user.email;

    const accessToken = await this.getAccessToken(
      user.email,
      user.id,
      user.roles,
    );
    const refreshToken = await this.getRefreshToken(
      user.email,
      user.id,
      user.roles,
    );

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
      accessToken: accessToken,
      data: {
        user,
      },
    };
  }

  // get access token for user
  async getAccessToken(email: string, userId: number, role: Role[]) {
    const payload = {
      sub: userId,
      email: email,
      role: role,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '100m',
      secret: this.configService.get('JWT_ACCESS_KEY'),
    });
  }

  // get refresh token for user
  async getRefreshToken(email: string, userId: number, role: Role[]) {
    const payload = {
      sub: userId,
      email: email,
      role: role,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '365d',
      secret: this.configService.get('JWT_REFRESH_KEY'),
    });
  }

  // request new access token
  async requestNewAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_KEY'),
    });

    // if (!payload) {
    //   throw new BadRequestException('Invalid token');
    // }
    console.log('check payload', payload);
    const newAccessToken = await this.getAccessToken(
      payload.email,
      +payload.sub,
      payload.role,
    );

    const newRefreshToken = await this.getRefreshToken(
      payload.email,
      +payload.sub,
      payload.role,
    );
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: './',
    });

    return {
      success: true,
      statusCode: 200,
      data: {
        accessToken: newAccessToken,
      },
    };
  }

  // logout service

  async logout(req: Request) {
    req.cookies.refreshToken = null;
    return {
      success: true,
      statusCode: 200,
      data: {
        message: 'Logout success!',
      },
    };
  }
}
