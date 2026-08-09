import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { MailService } from "../mail/mail.service";

import { TestMailDto } from "./dto/test-mail.dto";
import { UpdateMailSettingsDto } from "./dto/update-mail-settings.dto";
import { MailSettingsService } from "./mail-settings.service";

@Controller("mail-settings")
@UseGuards(JwtAuthGuard)
export class MailSettingsController {
  constructor(
    private readonly mailSettingsService:
      MailSettingsService,

    private readonly mailService:
      MailService,
  ) {}

  @Get()
  getSettings() {
    return this.mailSettingsService.getSafeSettings();
  }

  @Put()
  update(
    @Body()
    dto: UpdateMailSettingsDto,
  ) {
    return this.mailSettingsService.update(dto);
  }

  @Post("verify")
  verify() {
    return this.mailService.verifyConnection();
  }

  @Post("test")
  sendTestEmail(
    @Body()
    dto: TestMailDto,
  ) {
    return this.mailService.sendTestEmail(
      dto.email,
    );
  }
}