import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { recipesMulterConfig, profilesMulterConfig } from './config/multer.config';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('recipes')
  @UseInterceptors(FileInterceptor('file', recipesMulterConfig))
  async uploadRecipeImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const fileUrl = this.uploadsService.getFileUrl('recipes', file.filename);

      return {
        url: fileUrl,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to process file upload',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('profiles')
  @UseInterceptors(FileInterceptor('file', profilesMulterConfig))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const fileUrl = this.uploadsService.getFileUrl('profiles', file.filename);

      return {
        url: fileUrl,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to process file upload',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}