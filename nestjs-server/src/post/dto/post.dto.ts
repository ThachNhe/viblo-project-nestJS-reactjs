import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';

export class PostDTO {
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  contentMarkdown: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  tagArray: string[];
}

export class PostIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  postId: number;
}

export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export class VoteDTO {
  @IsEnum(VoteType)
  voteType: VoteType;
}
