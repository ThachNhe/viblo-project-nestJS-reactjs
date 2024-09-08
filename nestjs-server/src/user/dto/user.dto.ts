import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class UserIdDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
