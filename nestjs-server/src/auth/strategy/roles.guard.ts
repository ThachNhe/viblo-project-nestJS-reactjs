import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Lấy các roles cần thiết từ handler hoặc class
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = await context.switchToHttp().getRequest();

    // Lấy token từ cookie thay vì từ header Authorization
    const jwt = request.cookies['accessToken'];

    if (!jwt) {
      throw new UnauthorizedException();
    }

    // Xác thực JWT và lấy payload
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(jwt, {
        secret: this.configService.get('JWT_ACCESS_KEY'),
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    // Lấy role từ payload và kiểm tra xem có trùng với requiredRoles không
    const userRole = payload.role;
    const hasRole = requiredRoles.includes(userRole);
    // console.log('userRole', userRole);

    // console.log('requiredRoles : ', requiredRoles);

    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}
