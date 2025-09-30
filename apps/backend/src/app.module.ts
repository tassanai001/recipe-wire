import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import appConfig from './config/app.config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    // Config module with global access
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Logger module
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport: process.env.NODE_ENV !== 'production' 
          ? { target: 'pino-pretty', options: { colorize: true } } 
          : undefined,
        autoLogging: true,
        customProps: () => ({
          context: 'HTTP',
        }),
      },
    }),
    
    // Prisma module
    PrismaModule,
    
    // Health module
    HealthModule,
    
    // Uploads module
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}