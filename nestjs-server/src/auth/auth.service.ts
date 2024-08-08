import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class AuthService {
   constructor(private prismaService: PrismaService) {

   }
   registerService() {
      return 'This action adds a new user';
   }
}