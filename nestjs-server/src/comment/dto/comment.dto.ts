import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  parentId: number;

  replyForUserId: number;

  @IsString()
  replyForUserName: string;
}

export class PostIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  postId: number;
}
