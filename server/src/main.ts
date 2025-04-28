import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true, // Frontend URL for production
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser()); // Server side cookie validation
  app.use(helmet()); // HTTP security headers
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
