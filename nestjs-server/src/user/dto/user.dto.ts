import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;
}

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  avatar: string;
}

export class UserPaginationDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty()
  limit: number;
}
