import {
  ValidationPipe,
} from "@nestjs/common";

import {
  NestFactory,
} from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app =
    await NestFactory.create(
      AppModule,
    );

  /* =======================================================
     GLOBAL API PREFIX
  ======================================================= */

  app.setGlobalPrefix("api");

  /* =======================================================
     VALIDATION
  ======================================================= */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,
    }),
  );

  /* =======================================================
     CORS
  ======================================================= */

  const allowedOrigins = [
    /* LOCAL DEVELOPMENT */

    "http://localhost:5173",
    "http://localhost:5174",

    /* VERCEL FRONTEND */

    "https://private-chauffeur-frontend.vercel.app",

    /* PRODUCTION WEBSITE */

    "https://privatechauffeurmelbourne.com.au",
    "https://www.privatechauffeurmelbourne.com.au",

    /* OPTIONAL ENV FRONTEND URL */

    process.env.FRONTEND_URL,
  ].filter(
    (origin): origin is string =>
      Boolean(origin),
  );

  app.enableCors({
    origin: (
      origin,
      callback,
    ) => {
      /*
       * Allow requests without an Origin
       * header, such as server-to-server,
       * curl and health checks.
       */
      if (!origin) {
        callback(
          null,
          true,
        );

        return;
      }

      if (
        allowedOrigins.includes(
          origin,
        )
      ) {
        callback(
          null,
          true,
        );

        return;
      }

      callback(
        new Error(
          `CORS blocked request from origin: ${origin}`,
        ),
        false,
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
    ],
  });

  /* =======================================================
     PORT
  ======================================================= */

  const port =
    Number(
      process.env.PORT,
    ) || 3000;

  /* =======================================================
     START SERVER
  ======================================================= */

  await app.listen(port);

  console.log(
    `Private Chauffeur Melbourne API running on port ${port}`,
  );
}

void bootstrap();
