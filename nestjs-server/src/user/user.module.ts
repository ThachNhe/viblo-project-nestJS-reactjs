import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../auth/strategy';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      // Add your options here
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class UserModule {}
