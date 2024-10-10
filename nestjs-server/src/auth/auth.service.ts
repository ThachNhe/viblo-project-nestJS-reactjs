import { ConfigService } from '@nestjs/config';
import {
  AuthDTORegister,
  AuthDTOLogin,
  ResetPasswordDto,
} from './dto/auth.dto';
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
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectQueue('mail') private mailQueue: Queue,
  ) {}

  // user register service
  async register(body: AuthDTORegister) {
    let hashedPassword = await argon2.hash(body.password);
    const user = new User();
    user.email = body.email;
    user.password = hashedPassword;
    user.userName = body.userName;
    user.fullName = body.fullName;
    try {
      await this.userRepository.save(user);
      delete user.password;
      delete user.avatar;
      delete user.roles;
      return {
        statusCode: 200,
        err: null,
        success: true,
        data: {
          user: user,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // user login service
  async login(body: AuthDTOLogin, response: FastifyReply) {
    const user = await this.userRepository.findOne({
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

    response.setCookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });

    response.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });

    return {
      statusCode: 200,
      success: true,
      error: null,
      // accessToken: accessToken,
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
      expiresIn: '30s',
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
      expiresIn: '1m',
      secret: this.configService.get('JWT_REFRESH_KEY'),
    });
  }

  // request new access token
  async requestNewAccessToken(req: Request, res: FastifyReply) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_KEY'),
    });
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'strict',
      path: '/',
    });

    const newAccessToken = await this.getAccessToken(
      payload.email,
      +payload.sub,
      payload.role,
    );

    res.setCookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
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
  async logout(res: FastifyReply) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'strict',
      path: '/',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'strict',
      path: '/',
    });

    return {
      success: true,
      statusCode: 200,
      data: {
        message: 'Logout success!',
      },
    };
  }

  // forgot password service
  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: this.configService.get('JWT_RESET_KEY'),
    });

    await this.mailService.sendPasswordResetEmail(email, token);

    return {
      success: true,
      statusCode: 200,
      data: {
        message: 'Reset password link sent to your email',
      },
    };
  }

  // reset password service
  async resetPassword(body: ResetPasswordDto) {
    const payload = await this.jwtService.verify(body.token, {
      secret: this.configService.get('JWT_RESET_KEY'),
    });
    // console.log('payload', payload);
    const user = await this.userRepository.findOne({
      where: { id: payload.sub, email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await argon2.hash(body.newPassword);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return {
      success: true,
      statusCode: 200,
      error: null,
      data: {
        message: 'Password reset successfully',
      },
    };
  }
}
