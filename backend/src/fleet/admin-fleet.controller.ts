import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateFleetDto } from "./dto/create-fleet.dto";
import { CreateFleetMediaDto } from "./dto/create-fleet-media.dto";
import { OrderFleetMediaDto } from "./dto/order-fleet-media.dto";
import { UpdateFleetDto } from "./dto/update-fleet.dto";
import { FleetService } from "./fleet.service";

@Controller("admin/fleet")
@UseGuards(JwtAuthGuard)
export class AdminFleetController {
  constructor(
    private readonly fleetService: FleetService,
  ) {}

  @Get()
  findAll() {
    return this.fleetService.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateFleetDto) {
    return this.fleetService.create(dto);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.fleetService.findOneAdmin(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateFleetDto,
  ) {
    return this.fleetService.update(id, dto);
  }

  @Delete(":id")
  remove(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.fleetService.remove(id);
  }

  /*
   * The frontend must send URLs returned by persistent object
   * storage. Binary uploads are intentionally not stored in
   * PostgreSQL or the Vercel function filesystem.
   */
  @Post(":id/media")
  addMedia(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateFleetMediaDto,
  ) {
    return this.fleetService.addMedia(id, dto);
  }

  @Delete(":id/media/:mediaId")
  removeMedia(
    @Param("id", ParseIntPipe) id: number,
    @Param("mediaId", ParseIntPipe) mediaId: number,
  ) {
    return this.fleetService.removeMedia(id, mediaId);
  }

  @Patch(":id/media/order")
  orderMedia(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: OrderFleetMediaDto,
  ) {
    return this.fleetService.orderMedia(id, dto);
  }
}
