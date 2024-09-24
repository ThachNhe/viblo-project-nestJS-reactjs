import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TagResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({
    example: {
      name: 'async/await1',
      description: 'aonsknjdsfjnsdfj',
      id: '564',
      view_number: 0,
      post_number: 0,
      question_number: 0,
      follower_number: 0,
      created_at: '2024-09-23T21:52:48.918Z',
      updated_at: '2024-09-23T21:52:48.918Z',
    },
  })
  data: {
    name: string;
    description: string;
    id: string;
    view_number: number;
    post_number: number;
    question_number: number;
    follower_number: number;
    created_at: string;
    updated_at: string;
  };
}

class SearchTagDTO {
  @ApiProperty({ description: 'Unique identifier for the tag' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Name of the tag' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Detailed description of the tag' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Number of views for the tag', example: 0 })
  @IsNumber()
  view_number: number;

  @ApiProperty({
    description: 'Number of posts associated with the tag',
    example: 0,
  })
  @IsNumber()
  post_number: number;

  @ApiProperty({
    description: 'Number of questions associated with the tag',
    example: 0,
  })
  @IsNumber()
  question_number: number;

  @ApiProperty({ description: 'Number of followers for the tag', example: 0 })
  @IsNumber()
  follower_number: number;

  @ApiProperty({ description: 'Creation date of the tag', type: String })
  @IsString()
  created_at: string;

  @ApiProperty({ description: 'Last updated date of the tag', type: String })
  @IsString()
  updated_at: string;
}

export class SearchResponseDTO {
  @ApiProperty({ description: 'Indicates if the request was successful' })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: 'HTTP status code', example: 200 })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ description: 'Error message if any', nullable: true })
  @IsOptional()
  @IsString()
  error: string | null;

  @ApiProperty({
    type: [SearchTagDTO],
    description: 'List of tags',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SearchTagDTO)
  data: SearchTagDTO[];
}

export class ExistTagCheckApiResponseDTO {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'HTTP status code of the response',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message if any',
    nullable: true,
    example: null,
  })
  error: string | null;

  @ApiProperty({ description: 'Data returned by the API', example: false })
  data: boolean;
}
