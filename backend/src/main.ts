import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Private Chauffeur Melbourne API')
    .setDescription(
      'Backend API for bookings, quotes, fleet, blogs, pricing and website administration.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`API running at http://localhost:${port}/api/v1`);
  console.log(`Swagger available at http://localhost:${port}/api/docs`);
}

void bootstrap();