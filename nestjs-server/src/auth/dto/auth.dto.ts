import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class AuthDTORegister {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  fullName: string

  @IsNotEmpty()
  userName: string

  avatar: string
}

export class AuthDTOLogin {
  @ValidateIf(o => !o.userName)
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ValidateIf(o => !o.email)
  @IsNotEmpty()
  @IsString()
  userName?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}