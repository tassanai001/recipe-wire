import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  // Use Pino logger
  app.useLogger(app.get(Logger));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Use class-validator with NestJS container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Serve static files
  const uploadPath = process.env.UPLOAD_PATH || './uploads';
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  // Shutdown hooks
  app.enableShutdownHooks();

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);

  console.log(`🚀 API running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`📁 Uploads served at http://localhost:${port}/uploads/`);
}
bootstrap();