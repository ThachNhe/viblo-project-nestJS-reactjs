import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()

export class UserService {
   constructor(private prismaService: PrismaService) { }
   getUsersService() {
      const users = this.prismaService.user.findMany();
      return users;
   }
}
