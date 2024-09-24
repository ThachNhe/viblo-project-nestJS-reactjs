import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Role } from '../../enums/index';
import { ApiProperty } from '@nestjs/swagger';
export class AuthDTORegister {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  userName: string;

  @ApiProperty()
  @ApiProperty()
  @IsEnum(Role, { message: 'Role must be either admin, user, or moderator' })
  role: Role;
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
