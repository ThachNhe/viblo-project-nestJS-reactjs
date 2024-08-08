import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import {AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
