import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/index';
import { ConfigModule } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({ name: 'mail' }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, MailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
