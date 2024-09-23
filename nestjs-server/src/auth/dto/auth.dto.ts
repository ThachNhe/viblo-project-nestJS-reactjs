import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Role } from '../../enums/index';
export class AuthDTORegister {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  userName: string;

  @IsEnum(Role, { message: 'Role must be either admin, user, or moderator' })
  role: Role;
}

export class AuthDTOLogin {
  @ValidateIf((o) => !o.userName)
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @IsString()
  userName?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
