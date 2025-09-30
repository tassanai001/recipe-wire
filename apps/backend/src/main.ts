import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  // Set global API version prefix
  app.setGlobalPrefix('v1');

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

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

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
  console.log(`📋 API endpoints available at http://localhost:${port}/v1`);
}
bootstrap();