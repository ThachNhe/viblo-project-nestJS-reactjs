import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class UserIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  avatar: string;
}

export class UserPaginationDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;
}
