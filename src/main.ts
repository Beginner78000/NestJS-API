import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Champs contrôlé, va bloquer ce qui n'est pas définit dans le dto (whitelist: true)
  app.useGlobalPipes(new ValidationPipe({whitelist: true})),
  await app.listen(3000);
}
bootstrap();
