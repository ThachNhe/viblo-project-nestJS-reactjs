import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
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
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const jwt = context
      .switchToHttp()
      .getRequest()
      .headers['authorization'].split(' ')[1];

    const payload = await this.jwtService.verifyAsync(jwt, {
      secret: this.configService.get('JWT_ACCESS_KEY'),
    });

    const role = payload.role;
    return requiredRoles[0] === role;
  }
}
