import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    example: 'http://localhost:3001/uploads/recipes/123e4567-e89b-12d3-a456-426614174000-1678886400000.jpg',
    description: 'URL to access the uploaded file',
  })
  url?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000-1678886400000.jpg',
    description: 'Unique filename of the uploaded file',
  })
  filename?: string;

  @ApiProperty({
    example: 1024000,
    description: 'Size of the uploaded file in bytes',
  })
  size?: number;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'MIME type of the uploaded file',
  })
  mimetype?: string;

  constructor(partial: Partial<UploadResponseDto> = {}) {
    Object.assign(this, partial);
  }
}