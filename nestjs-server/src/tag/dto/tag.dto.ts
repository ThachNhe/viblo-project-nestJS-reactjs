import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
``;
export class TagDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;
}

export class TagNameDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class KeywordDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  keyword: string;
}
