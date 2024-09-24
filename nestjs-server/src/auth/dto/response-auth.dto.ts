import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  follower_number: number;

  @ApiProperty()
  star_number: number;

  @ApiProperty()
  post_number: number;

  @ApiProperty()
  isBlocked: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: null, nullable: true })
  err: string | null;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: () => UserResponseDto })
  data: UserResponseDto;
}

export class LoginUserResponse {
  @ApiProperty({ example: '622' })
  id: string;

  @ApiProperty({ example: 'Test User' })
  fullName: string;

  @ApiProperty({ example: 'thachdinh' })
  userName: string;

  @ApiProperty({ example: 'ADMIN' })
  roles: string;

  @ApiProperty({ example: null, nullable: true })
  avatar: string | null;

  @ApiProperty({ example: false })
  isBlocked: boolean;
}

export class LoginResponseData {
  @ApiProperty({ type: () => LoginUserResponse })
  user: LoginUserResponse;
}

export class LoginResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: null, nullable: true })
  error: string | null;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MjcxNDkzMTgsImV4cCI6MTcyNzE1NTMxOH0.KOCdnM0VzoWNf42a5_FwE5c2r4nCQbWSddkgeuWTJfU',
  })
  accessToken: string;

  @ApiProperty({ type: () => LoginResponseData })
  data: LoginResponseData;
}

export class LogoutResponseDTO {
  @ApiProperty({
    example: true,
    description: 'Indicates if the request was successful',
  })
  success: boolean;

  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({
    example: { message: 'Logout success!' },
    description: 'Data object containing response message',
  })
  data: {
    message: string;
  };
}
