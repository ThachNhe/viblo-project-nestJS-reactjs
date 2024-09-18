import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class TagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}

export class TagNameDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class KeywordDTO {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
