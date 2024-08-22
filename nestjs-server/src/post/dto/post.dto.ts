import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDTO {
  // @IsNotEmpty()
  // @IsNumber()
  // authorId: number;

  @IsNotEmpty()
  @IsString()
  contentMarkdown: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  tagArray: string;
}
