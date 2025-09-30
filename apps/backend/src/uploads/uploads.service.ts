import { Injectable, Logger, HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unlink, readdir, stat, mkdir } from 'fs/promises';
import { join, extname } from 'path';

@Injectable()
export class UploadsService implements OnModuleInit {
  private readonly logger = new Logger(UploadsService.name);
  private readonly uploadPath: string;
  private readonly uploadTypes = ['recipes', 'profiles'] as const;

  constructor(private configService: ConfigService) {
    // Standardize to use UPLOAD_PATH environment variable
    this.uploadPath = this.configService.get<string>('UPLOAD_PATH') || './uploads';
  }

  /**
   * Initialize upload directories asynchronously on module startup
   * This prevents blocking operations during file uploads
   */
  async onModuleInit() {
    try {
      // Create base upload directory
      await mkdir(this.uploadPath, { recursive: true });
      this.logger.log(`Created base upload directory: ${this.uploadPath}`);

      // Create subdirectories for each type
      for (const type of this.uploadTypes) {
        const typePath = join(this.uploadPath, type);
        await mkdir(typePath, { recursive: true });
        this.logger.log(`Created upload directory for ${type}: ${typePath}`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to initialize upload directories: ${this.sanitizeErrorMessage(error.message)}`);
      throw new HttpException(
        'Failed to initialize file upload system',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getFileUrl(type: string, filename: string): string {
    const baseUrl = this.configService.get<string>('API_BASE_URL') || 'http://localhost:3001';
    return `${baseUrl}/uploads/${type}/${filename}`;
  }

  async saveFile(type: string, file: Express.Multer.File): Promise<string> {
    // The file is already saved by Multer, we just return the path
    const filePath = join(this.uploadPath, type, file.filename);
    this.logger.log(`File saved successfully`);

    // Validate file exists
    await this.validateFileExists(type, file.filename);
    
    return filePath;
  }

  async deleteFile(type: string, filename: string): Promise<void> {
    try {
      const filePath = join(this.uploadPath, type, filename);
      await unlink(filePath);
      this.logger.log(`File deleted successfully`);
    } catch (error: any) {
      this.logger.error(`Failed to delete file: ${this.sanitizeErrorMessage(error.message)}`);
      throw new HttpException(
        'Could not delete file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateFileExists(type: string, filename: string): Promise<boolean> {
    try {
      const filePath = join(this.uploadPath, type, filename);
      const fileStats = await stat(filePath);
      return fileStats.isFile();
    } catch (error: any) {
      this.logger.error(`File validation failed: ${this.sanitizeErrorMessage(error.message)}`);
      throw new HttpException(
        'File does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteOldFiles(type: string, maxAgeInDays: number): Promise<number> {
    const typePath = join(this.uploadPath, type);
    let deletedCount = 0;

    try {
      const files = await readdir(typePath);
      const now = Date.now();

      for (const filename of files) {
        if (extname(filename) !== '') { // Skip directories
          const filePath = join(typePath, filename);
          const stats = await stat(filePath);

          if (stats.isFile()) {
            const fileAgeInDays = (now - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

            if (fileAgeInDays > maxAgeInDays) {
              await unlink(filePath);
              this.logger.log(`Deleted old file (age: ${Math.round(fileAgeInDays)} days)`);
              deletedCount++;
            }
          }
        }
      }
    } catch (error: any) {
      this.logger.error(`Error cleaning up old files: ${this.sanitizeErrorMessage(error.message)}`);
    }

    return deletedCount;
  }

  /**
   * Sanitize error messages to prevent information disclosure
   * Removes file paths, system information, and sensitive data
   */
  private sanitizeErrorMessage(message: string): string {
    if (!message) return 'Unknown error';
    
    return message
      // Remove Unix-style absolute paths
      .replace(/\/[^\s]+/g, '[path]')
      // Remove Windows-style absolute paths
      .replace(/[A-Z]:\\[^\s]+/g, '[path]')
      // Remove relative paths
      .replace(/\.\.?\/[^\s]+/g, '[path]')
      // Remove backslashes
      .replace(/\\/g, '')
      // Remove potential user information
      .replace(/\/home\/[^\s\/]+/g, '[user]')
      .replace(/\/Users\/[^\s\/]+/g, '[user]')
      // Limit length
      .substring(0, 200);
  }
}