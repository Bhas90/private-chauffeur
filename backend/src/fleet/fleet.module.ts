import { Module } from "@nestjs/common";

import {
  AdminFleetController,
} from "./admin-fleet.controller";
import {
  FleetPopupController,
} from "./fleet-popup.controller";
import { FleetController } from "./fleet.controller";
import { FleetService } from "./fleet.service";

@Module({
  controllers: [
    FleetController,
    AdminFleetController,
    FleetPopupController,
  ],
  providers: [FleetService],
  exports: [FleetService],
})
export class FleetModule {}
