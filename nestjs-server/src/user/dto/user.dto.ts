import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  @Min(1)
  id: number;
}

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  // @IsUrl({
  //   require_protocol: true, // Bắt buộc phải có giao thức (http hoặc https)
  //   require_valid_protocol: true, // Giao thức phải hợp lệ
  //   protocols: ['http', 'https'], // Chỉ chấp nhận http và https
  // })
  // @IsUrl()
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
