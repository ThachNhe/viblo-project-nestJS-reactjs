import { Controller, Get, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";
@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {

   }
   @Post('register')
   register(@Body() body: AuthDTO) {
      return this.authService.registerService();
   };

   @Get('login')
   login() {
      return 'This action logs a user in';
   }
}  
