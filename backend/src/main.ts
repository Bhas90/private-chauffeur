import {
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  });

  const port =
    Number(process.env.PORT) || 3000;

  await app.listen(port);

  console.log(
    `Private Chauffeur Melbourne API running on http://localhost:${port}/api`,
  );
}

bootstrap();