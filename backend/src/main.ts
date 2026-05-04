import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import mongoose from 'mongoose';
import { AppConfig } from './app.config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>('CONFIG');

  await mongoose.connect(config.database.url);
  console.log('MongoDB подключен');

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
