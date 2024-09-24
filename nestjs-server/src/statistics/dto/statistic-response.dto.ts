import { ApiProperty } from '@nestjs/swagger';

class TagStatisticsDTO {
  @ApiProperty({ description: 'Số lượng tag', example: 6 })
  tagNumber: number;

  @ApiProperty({ description: 'Số lượng bài viết', example: 8 })
  postNumber: number;
}

export class TagStatisticsApiResponseDTO {
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
    description: 'Thông tin thống kê tag',
    type: TagStatisticsDTO,
  })
  data: TagStatisticsDTO;
}

class TagCommonStatisticsDTO {
  @ApiProperty({ description: 'The number of tags', example: 6 })
  tagNumber: number;

  @ApiProperty({ description: 'The number of posts', example: 8 })
  postNumber: number;

  @ApiProperty({ description: 'The number of users', example: 2 })
  userNumber: number;

  @ApiProperty({ description: 'The number of comments', example: 3 })
  commentNumber: number;

  @ApiProperty({ description: 'The number of views', example: 0 })
  viewNumber: number;
}

export class TagCommonStatisticsApiResponseDTO {
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
    description: 'Thông tin thống kê tag mở rộng',
    type: TagCommonStatisticsDTO,
  })
  data: TagCommonStatisticsDTO;
}
