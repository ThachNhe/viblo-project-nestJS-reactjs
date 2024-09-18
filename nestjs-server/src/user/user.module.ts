import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../auth/strategy';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, User } from '../entity/index';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    ConfigModule,
    JwtModule.register({}),
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
