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
