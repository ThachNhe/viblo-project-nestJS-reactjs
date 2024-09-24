import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FileUploadDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fileName: string;
}
