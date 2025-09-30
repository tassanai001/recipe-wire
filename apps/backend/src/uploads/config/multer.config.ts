import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

// Helper function to create multer config for a specific type
export const createMulterConfig = (type: 'recipes' | 'profiles') => ({
  storage: diskStorage({
    destination: (_req: any, _file: any, cb: any) => {
      // Get upload path from environment or default
      const uploadPath = process.env.UPLOAD_PATH || './uploads';
      const fullDestination = `${uploadPath}/${type}`;
      
      // Fast path: check if directory exists first to minimize blocking
      // Directory should already exist from UploadsService.onModuleInit()
      if (!existsSync(fullDestination)) {
        try {
          // Fallback: create directory if it doesn't exist
          // This should rarely execute after module initialization
          mkdirSync(fullDestination, { recursive: true });
        } catch (err: any) {
          // Don't expose internal paths in error messages
          console.error(`Failed to prepare upload directory for ${type}`);
          return cb(new Error('Failed to prepare upload directory'));
        }
      }
      
      cb(null, fullDestination);
    },
    filename: (_req: any, file: any, cb: any) => {
      // Sanitize the filename and create a unique name
      const uniqueName = `${uuidv4()}-${Date.now()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (_req: any, file: any, cb: any) => {
    // Allowed MIME types
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false);
    }
  },
  limits: {
    fileSize: 3 * 1024 * 1024, // 3 MB
  },
});

// Export specific configs for each type
export const recipesMulterConfig = createMulterConfig('recipes');
export const profilesMulterConfig = createMulterConfig('profiles');