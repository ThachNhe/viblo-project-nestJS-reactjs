import { AuthDTORegister, AuthDTOLogin } from './dto/auth.dto';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon2 from "argon2";
@Injectable()
export class AuthService {
   constructor(private prismaService: PrismaService) {

   }
   async registerService(body: AuthDTORegister) {
      let hasPassword = await argon2.hash(body.password);
      try {
         const user = await this.prismaService.user.create({
            data: {
               email: body.email,
               password: hasPassword,
               userName: body.userName,
               fullName: body.fullName,
               imgURL: body.imgURL
            },
            select: {
               id: true,
               email: true,
               fullName: true,
            }
         })
         return {
            errCode: 0,
            msg: 'Register success!',
            user: user
         }
      } catch (err) {
         return {
            errCode: 1,
            msg: 'Register failed!',
            err: err
         };
      }
   }

   async loginService(body: AuthDTOLogin) {
      try {
         const user = await this.prismaService.user.findFirst({
            where: {
               OR: [
                  { email: body.email },
                  { userName: body.userName },
               ],
            },
         });
         if (!user) {
            return {
               errCode: 1,
               msg: 'User not found!',
            }
         }
         const isValidPassword = await argon2.verify(user.password, body.password);
         if (!isValidPassword) {
            return {
               errCode: -1,
               msg: "Password not correct!"
            }
         }
         delete user.password;
         return user;
      } catch (error) {
         return {
            errCode: -2,
            err: error
         }
      }
   }
}
