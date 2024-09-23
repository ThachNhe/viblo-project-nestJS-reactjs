import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { IsEnum } from 'class-validator';

export class PostDTO {
  @IsNotEmpty()
  @IsString()
  contentMarkdown: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'tagArray must contain at least one tag.' })
  @ArrayMaxSize(5, { message: 'tagArray must contain at most five tags.' })
  @IsString({ each: true })
  tagArray: string[];
}

export class PostIdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(1, { message: 'postId must be less than 1 id' })
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
