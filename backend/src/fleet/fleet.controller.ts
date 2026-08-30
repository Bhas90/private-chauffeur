import {
  Controller,
  Get,
  Param,
} from "@nestjs/common";

import { FleetService } from "./fleet.service";

@Controller("fleet")
export class FleetController {
  constructor(
    private readonly fleetService: FleetService,
  ) {}

  @Get()
  findPublished() {
    return this.fleetService.findPublished();
  }

  @Get("featured")
  findFeatured() {
    return this.fleetService.findFeatured();
  }

  @Get(":slug")
  findPublishedBySlug(
    @Param("slug") slug: string,
  ) {
    return this.fleetService.findPublishedBySlug(
      slug,
    );
  }
}
