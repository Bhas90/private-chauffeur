import {
  forwardRef,
  Module,
} from "@nestjs/common";

import { MailModule } from "../mail/mail.module";

import { MailSettingsController } from "./mail-settings.controller";
import { MailSettingsService } from "./mail-settings.service";

@Module({
  imports: [
    forwardRef(
      () => MailModule,
    ),
  ],

  controllers: [
    MailSettingsController,
  ],

  providers: [
    MailSettingsService,
  ],

  exports: [
    MailSettingsService,
  ],
})
export class MailSettingsModule {}