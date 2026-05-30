import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createLogger } from './logger/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerFormat = process.env.LOGGER_FORMAT || 'dev';
  app.useLogger(createLogger(loggerFormat));

  await app.listen(3000);
}
bootstrap();
