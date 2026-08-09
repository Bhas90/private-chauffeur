import {
  BadRequestException,
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { ContactMailDto } from "./dto/contact-mail.dto";
import { QuoteMailDto } from "./dto/quote-mail.dto";
import { ReportProblemMailDto } from "./dto/report-problem-mail.dto";

import { MailService } from "./mail.service";

@Controller("mail")
export class MailController {
  constructor(
    private readonly mailService:
      MailService,
  ) {}

  /* =======================================================
     QUOTE REQUEST
  ======================================================= */

  @Post("quote")
  sendQuote(
    @Body()
    dto: QuoteMailDto,
  ) {
    return this.mailService.sendQuoteRequest(
      dto,
    );
  }

  /* =======================================================
     CONTACT ENQUIRY
  ======================================================= */

  @Post("contact")
  sendContact(
    @Body()
    dto: ContactMailDto,
  ) {
    return this.mailService.sendContactRequest(
      dto,
    );
  }

  /* =======================================================
     REPORT A PROBLEM
  ======================================================= */

  @Post("report-problem")
  @UseInterceptors(
    FileInterceptor(
      "attachment",
      {
        limits: {
          fileSize:
            5 * 1024 * 1024,
        },

        fileFilter: (
          _request,
          file,
          callback,
        ) => {
          const allowedMimeTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
          ];

          if (
            !allowedMimeTypes.includes(
              file.mimetype,
            )
          ) {
            return callback(
              new BadRequestException(
                "Only PDF, JPG, PNG and WEBP files are allowed.",
              ),
              false,
            );
          }

          callback(
            null,
            true,
          );
        },
      },
    ),
  )
  sendProblemReport(
    @Body()
    dto: ReportProblemMailDto,

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize:
            5 * 1024 * 1024,
        })
        .build({
          fileIsRequired: false,

          errorHttpStatusCode:
            400,
        }),
    )
    attachment?:
      Express.Multer.File,
  ) {
    return this.mailService.sendProblemReport(
      dto,
      attachment,
    );
  }
}