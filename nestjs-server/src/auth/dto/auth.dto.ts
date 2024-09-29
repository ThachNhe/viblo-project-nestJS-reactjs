import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTORegister {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @ApiProperty()
  userName: string;
}

export class AuthDTOLogin {
  @ValidateIf((o) => !o.userName)
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newPassword: string;
}
