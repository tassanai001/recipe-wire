import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Check if file exists
    if (!request.file) {
      throw new BadRequestException('No file uploaded');
    }

    // Additional validations
    this.validateFileSize(request.file);
    this.validateFileType(request.file);

    return next.handle();
  }

  private validateFileSize(file: Express.Multer.File): void {
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size is too large. Maximum allowed size is 3MB.`,
      );
    }
  }

  private validateFileType(file: Express.Multer.File): void {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
      );
    }

    // Validate file extension matches MIME type
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    let expectedExtensions: string[] = [];
    
    switch (file.mimetype) {
      case 'image/jpeg':
        expectedExtensions = ['jpg', 'jpeg'];
        break;
      case 'image/png':
        expectedExtensions = ['png'];
        break;
      case 'image/webp':
        expectedExtensions = ['webp'];
        break;
    }

    if (fileExtension && !expectedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        'File extension does not match the file type.',
      );
    }
  }
}