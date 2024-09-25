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
import { Role } from 'src/enums/role.enum';

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

    // Nếu không có role nào yêu cầu, cho phép truy cập
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    // Kiểm tra nếu không có header authorization hoặc header không đúng định dạng
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    // Lấy token từ header
    const jwt = authorizationHeader.split(' ')[1];
    if (!jwt) {
      throw new UnauthorizedException('Token is missing');
    }

    // Xác thực JWT và lấy payload
    let payload;
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

    if (!hasRole) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}
