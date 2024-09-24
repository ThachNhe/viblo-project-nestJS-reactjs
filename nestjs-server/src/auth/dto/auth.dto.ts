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
