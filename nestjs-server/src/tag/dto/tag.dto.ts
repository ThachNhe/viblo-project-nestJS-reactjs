import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class TagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
