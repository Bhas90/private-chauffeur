import { Module } from "@nestjs/common";

import { SitemapController } from "./sitemap.controller";
import { BlogsModule } from "../blogs/blogs.module";
import { FleetModule } from "../fleet/fleet.module";

@Module({
  imports: [
    BlogsModule,
    FleetModule,
  ],

  controllers: [
    SitemapController,
  ],
})
export class SitemapModule {}
