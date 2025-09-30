export interface FileUploadValidation {
  /**
   * Validates that the file is an allowed image type
   */
  isAllowedType(mimetype: string): boolean;
  
  /**
   * Validates that the file size is within the allowed limit
   */
  isWithinSizeLimit(size: number): boolean;
  
  /**
   * Sanitizes the filename to prevent path traversal
   */
  sanitizeFilename(filename: string): string;
}