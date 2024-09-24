import { ApiProperty } from '@nestjs/swagger';

class CommentResponseDTO {
  @ApiProperty({
    description: 'Nội dung bình luận',
    example: 'Bài viết quá mlemOKOKOKOKOOK!!',
  })
  content: string;

  @ApiProperty({
    description: 'ID của bình luận cha (0 nếu là bình luận gốc)',
    example: 0,
  })
  parentId: number;

  @ApiProperty({
    description: 'ID của người dùng mà bình luận này đang trả lời',
    example: 15,
  })
  replyForUserId: number;

  @ApiProperty({
    description: 'Tên người dùng mà bình luận này đang trả lời',
    example: 'thachdinh10',
  })
  replyForUserName: string;

  @ApiProperty({ description: 'ID của bình luận', example: '3' })
  id: string;

  @ApiProperty({
    description: 'Số thứ tự của bình luận trong chuỗi bình luận',
    example: 0,
  })
  row_number: number;

  @ApiProperty({
    description: 'Thời gian tạo bình luận',
    example: '2024-09-23T23:26:42.558Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'Thời gian cập nhật bình luận',
    example: '2024-09-23T23:26:42.558Z',
  })
  updated_at: string;
}

export class CommentApiResponseDTO {
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

  @ApiProperty({
    description: 'Data returned by the API',
    type: CommentResponseDTO,
  })
  data: CommentResponseDTO;
}

class ByPostIdCommentGetApiCommentDTO {
  @ApiProperty({ description: 'ID của bình luận', example: '1' })
  id: string;

  @ApiProperty({
    description: 'Nội dung bình luận',
    example: 'Bài viết quá mlemOKOKOKOKOOK!!',
  })
  content: string;

  @ApiProperty({ description: 'ID của bình luận cha', example: '0' })
  parentId: string;

  @ApiProperty({
    description: 'Số thứ tự của bình luận trong chuỗi bình luận',
    example: 0,
  })
  row_number: number;

  @ApiProperty({
    description: 'ID của người dùng mà bình luận này đang trả lời',
    example: 15,
  })
  replyForUserId: number;

  @ApiProperty({
    description: 'Tên người dùng mà bình luận này đang trả lời',
    example: 'thachdinh10',
  })
  replyForUserName: string;

  @ApiProperty({
    description: 'Thời gian tạo bình luận',
    example: '2024-09-23T23:24:49.531Z',
  })
  created_at: string;

  @ApiProperty({ description: 'ID của tác giả bình luận', example: '626' })
  authorId: string;

  @ApiProperty({
    description: 'Họ tên của tác giả bình luận',
    example: 'Test User',
  })
  authorfullname: string;

  @ApiProperty({
    description: 'Tên người dùng của tác giả bình luận',
    example: 'thachdinh',
  })
  authorusername: string;

  @ApiProperty({
    description: 'URL avatar của tác giả bình luận',
    nullable: true,
    example: null,
  })
  authoravatar: string | null;

  @ApiProperty({
    description: 'Thời gian tạo bình luận (định dạng dễ đọc)',
    example: 'thg 9 24, 2024 6:24 SA',
  })
  createdDate: string;
}

export class CommentListApiResponseDTO {
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

  @ApiProperty({
    description: 'Danh sách bình luận',
    type: [ByPostIdCommentGetApiCommentDTO],
  })
  data: ByPostIdCommentGetApiCommentDTO[];
}
