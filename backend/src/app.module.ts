import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./auth/auth.module";
import { BlogsModule } from "./blogs/blogs.module";
import { DatabaseModule } from "./database/database.module";
import { FleetModule } from "./fleet/fleet.module";
import { MailModule } from "./mail/mail.module";
import { MailSettingsModule } from "./mail-settings/mail-settings.module";
import { SitemapModule } from "./sitemap/sitemap.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,

    UsersModule,

    AuthModule,

    BlogsModule,

    MailSettingsModule,

    MailModule,

    FleetModule,

    SitemapModule,
  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,
  ],
})
export class AppModule {}
