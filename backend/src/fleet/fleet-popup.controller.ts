import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateFleetPopupDto } from "./dto/update-fleet-popup.dto";
import { FleetService } from "./fleet.service";

@Controller()
export class FleetPopupController {
  constructor(
    private readonly fleetService: FleetService,
  ) {}

  @Get("fleet-popup")
  getPublicPopup() {
    return this.fleetService.getPublicPopup();
  }

  @UseGuards(JwtAuthGuard)
  @Get("admin/fleet-popup")
  getAdminPopup() {
    return this.fleetService.getPopupAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Patch("admin/fleet-popup")
  updatePopup(
    @Body() dto: UpdateFleetPopupDto,
  ) {
    return this.fleetService.updatePopup(dto);
  }
}
