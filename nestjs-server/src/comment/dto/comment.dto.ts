import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  parentId: number;

  @ApiProperty()
  replyForUserId: number;

  @IsString()
  @ApiProperty()
  replyForUserName: string;
}

export class PostIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty()
  postId: number;
}
