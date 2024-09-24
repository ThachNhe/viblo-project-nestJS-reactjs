import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ example: '308' })
  id: string;

  @ApiProperty({ example: 'Second Post' })
  title: string;

  @ApiProperty({ example: 'This is the content for the second post.' })
  content_markdown: string;

  @ApiProperty({ example: ['nestjs'] })
  tags_array: string[];

  @ApiProperty({ example: 'PUBLISH' })
  status: string;

  @ApiProperty({ example: 0 })
  view_number: number;

  @ApiProperty({ example: 0 })
  vote_number: number;

  @ApiProperty({ example: 0 })
  bookmark_number: number;

  @ApiProperty({ example: 0 })
  comment_number: number;

  @ApiProperty({ example: false })
  isPublished: boolean;

  @ApiProperty({ example: 1, nullable: true })
  seriesId: number | null;

  @ApiProperty({ example: '2024-09-24T02:47:29.161Z' })
  created_at: string;

  @ApiProperty({ example: '2024-09-24T02:47:29.161Z' })
  updated_at: string;
}

export class userInfoResponseDto {
  @ApiProperty({ example: '623' })
  id: string;

  @ApiProperty({ example: 'Test User' })
  fullName: string;

  @ApiProperty({ example: 'thachdinh2' })
  userName: string;

  @ApiProperty({ example: 'thachdinh2@gmail.com' })
  email: string;

  @ApiProperty({ example: null, nullable: true })
  avatar: string | null;

  @ApiProperty({ example: 0 })
  follower_number: number;

  @ApiProperty({ type: [PostDto] })
  posts: PostDto[];
}

export class getUserIdResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ type: () => userInfoResponseDto })
  data: userInfoResponseDto;
}

export class DeleteUserResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ example: 'Delete user successfully' })
  data: string;
}

export class MetaDto {
  @ApiProperty({ example: 0 })
  totalItems: number;

  @ApiProperty({ example: 0 })
  totalPages: number;

  @ApiProperty({ example: 2 })
  currentPage: number;

  @ApiProperty({ example: 15 })
  pageSize: number;
}

export class GetUsersResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ type: [PostDto] })
  data: PostDto[];

  @ApiProperty({ type: MetaDto })
  meta: MetaDto;
}

export class BlockedUserResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ example: 'Block user successfully' })
  data: string;
}

export class UnBlockedUserResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ example: 'Unblock user successfully' })
  data: string;
}
