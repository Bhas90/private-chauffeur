import {
  forwardRef,
  Module,
} from "@nestjs/common";

import { MailSettingsModule } from "../mail-settings/mail-settings.module";

import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

@Module({
  imports: [
    forwardRef(
      () => MailSettingsModule,
    ),
  ],

  controllers: [
    MailController,
  ],

  providers: [
    MailService,
  ],

  exports: [
    MailService,
  ],
})
export class MailModule {}