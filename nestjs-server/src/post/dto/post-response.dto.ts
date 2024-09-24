import { ApiProperty } from '@nestjs/swagger';

class PostDto {
  @ApiProperty({ example: 'Post content' })
  title: string;

  @ApiProperty({ example: 'esdffd' })
  content_markdown: string;

  @ApiProperty({ type: [String], example: ['nestjs'] })
  tags_array: string[];

  @ApiProperty({ example: null })
  seriesId: number | null;

  @ApiProperty({ example: '316' })
  id: string;

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

  @ApiProperty({ example: '2024-09-23T21:24:22.042Z' })
  created_at: string;

  @ApiProperty({ example: '2024-09-23T21:24:22.042Z' })
  updated_at: string;
}

export class CreatedPostApiResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ type: PostDto })
  data: PostDto;
}

class AuthorDto {
  @ApiProperty({ example: '626' })
  id: string;

  @ApiProperty({ example: 'Test User' })
  fullName: string;

  @ApiProperty({ example: 'thachdinh' })
  userName: string;

  @ApiProperty({ example: null })
  avatar: string | null;
}

class GotPostsDto {
  @ApiProperty({ example: '316' })
  id: string;

  @ApiProperty({ example: 'Post content' })
  title: string;

  @ApiProperty({ example: 'esdffd' })
  content_markdown: string;

  @ApiProperty({ type: [String], example: ['nestjs'] })
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

  @ApiProperty({ example: null })
  seriesId: number | null;

  @ApiProperty({ example: 'thg 9 24, 2024 4:24 SA' })
  created_at: string;

  @ApiProperty({ example: '2024-09-23T21:24:22.042Z' })
  updated_at: string;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;
}

export class GotPostsApiResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ type: [GotPostsDto] })
  data: GotPostsDto[];

  @ApiProperty({
    example: {
      totalItems: 7,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
  })
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

class getPostIdAuthorDto {
  @ApiProperty({ example: '626' })
  id: string;

  @ApiProperty({ example: 'Test User' })
  fullName: string;

  @ApiProperty({ example: 'thachdinh' })
  userName: string;

  @ApiProperty({ example: 'ADMIN' })
  roles: string;

  @ApiProperty({ example: null })
  avatar: string | null;

  @ApiProperty({ example: 0 })
  follower_number: number;

  @ApiProperty({ example: 0 })
  star_number: number;

  @ApiProperty({ example: 5 })
  post_number: number;

  @ApiProperty({ example: false })
  isBlocked: boolean;

  @ApiProperty({ example: '2024-09-23T21:05:08.339Z' })
  created_at: string;

  @ApiProperty({ example: '2024-09-23T21:24:22.050Z' })
  updated_at: string;
}

class GetPostIdPostDto {
  @ApiProperty({ example: '310' })
  id: string;

  @ApiProperty({ example: 'First Post' })
  title: string;

  @ApiProperty({ example: 'This is the content for the first post.' })
  content_markdown: string;

  @ApiProperty({ type: [String], example: ['nestjs', 'testing'] })
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

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({ example: null })
  seriesId: number | null;

  @ApiProperty({ example: '2024-09-24T04:05:08.351Z' })
  created_at: string;

  @ApiProperty({ example: '2024-09-24T04:05:08.351Z' })
  updated_at: string;

  @ApiProperty({ type: [String], example: [] })
  userVotes: string[]; // hoặc có thể tạo DTO riêng nếu có cấu trúc phức tạp

  @ApiProperty({ type: [String], example: [] })
  comments: string[]; // hoặc có thể tạo DTO riêng cho comment

  @ApiProperty({ type: [String], example: [] })
  bookmarkers: string[]; // hoặc có thể tạo DTO riêng nếu cần

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ example: 'thg 9 24, 2024 11:05 SA' })
  createdDate: string;
}

export class GetPostIdApiResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ type: PostDto })
  data: PostDto;

  // Không cần meta trong trường hợp này vì chỉ có một bài viết
}

class PostVoteDto {
  @ApiProperty({ example: '317' })
  id: string;

  @ApiProperty({ example: 'Post content' })
  title: string;

  @ApiProperty({ example: 'esdffd' })
  content_markdown: string;

  @ApiProperty({ type: [String], example: ['nestjs'] })
  tags_array: string[];

  @ApiProperty({ example: 'PUBLISH' })
  status: string;

  @ApiProperty({ example: 0 })
  view_number: number;

  @ApiProperty({ example: -1 })
  vote_number: number; // Có thể có giá trị âm

  @ApiProperty({ example: 0 })
  bookmark_number: number;

  @ApiProperty({ example: 0 })
  comment_number: number;

  @ApiProperty({ example: false })
  isPublished: boolean;

  @ApiProperty({ example: null })
  seriesId: number | null;

  @ApiProperty({ example: '2024-09-23T21:41:58.090Z' })
  created_at: string;

  @ApiProperty({ example: '2024-09-23T21:42:03.430Z' })
  updated_at: string;

  // Các thuộc tính userVotes, comments và bookmarkers có thể không cần thiết nếu không có trong response
  @ApiProperty({ type: [String], example: [] })
  userVotes: string[]; // Hoặc có thể tạo DTO riêng nếu có cấu trúc phức tạp

  @ApiProperty({ type: [String], example: [] })
  comments: string[]; // Hoặc có thể tạo DTO riêng cho comment

  @ApiProperty({ type: [String], example: [] })
  bookmarkers: string[]; // Hoặc có thể tạo DTO riêng nếu cần

  @ApiProperty({ type: AuthorDto, nullable: true })
  author?: AuthorDto; // Chỉ bao gồm nếu cần thiết

  @ApiProperty({ example: 'thg 9 24, 2024 11:05 SA', nullable: true })
  createdDate?: string; // Chỉ bao gồm nếu cần thiết
}

export class PostVoteApiResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ type: PostDto })
  data: PostDto;
}

export class BookmarkResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ example: 'Bookmark successfully' })
  data: string; // Hoặc có thể là một thông điệp tùy chỉnh
}

export class UnbookmarkResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({ example: 'UnBookmark successfully' })
  data: string; // Thông điệp trả về
}
