import { ApiProperty } from '@nestjs/swagger';

export class PresignedUrlResponseDTO {
  @ApiProperty({ description: 'Status of the request', example: 'success' })
  status: string;

  @ApiProperty({
    description: 'Presigned URL for file access',
    example: 'http://localhost:9000/test/Thach2.jpg?X-Amz-Algori...',
  })
  presignedURL: string;
}

export class ImageUrlResponseDTO {
  @ApiProperty({ description: 'Status of the request', example: 'success' })
  status: string;

  @ApiProperty({
    description: 'URL for the uploaded image',
    example: 'http://localhost:9000/test/Thach2.jpg?X-Amz-Algori...',
  })
  imageURL: string;
}
