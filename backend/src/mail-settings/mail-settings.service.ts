import { Injectable } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service";
import { UpdateMailSettingsDto } from "./dto/update-mail-settings.dto";

@Injectable()
export class MailSettingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /* =======================================================
     GET OR CREATE SETTINGS
  ======================================================= */

  async getSettings() {
    const settings =
      await this.prisma.mailSettings.findUnique({
        where: {
          id: 1,
        },
      });

    if (!settings) {
      return this.prisma.mailSettings.create({
        data: {
          id: 1,

          enabled: false,

          smtpSecure: false,

          sendAdminEmail: true,

          sendCustomerAutoReply: true,

          sendWhatsappNotification: false,
        },
      });
    }

    return settings;
  }

  /* =======================================================
     SAFE SETTINGS FOR ADMIN FRONTEND
  ======================================================= */

  async getSafeSettings() {
    const settings =
      await this.getSettings();

    return {
      id: settings.id,

      /* SMTP */

      smtpHost:
        settings.smtpHost ?? "",

      smtpPort:
        settings.smtpPort ?? 587,

      smtpSecure:
        settings.smtpSecure,

      smtpUsername:
        settings.smtpUsername ?? "",

      /*
       * Never return the actual SMTP
       * password to the frontend.
       */
      hasSmtpPassword:
        Boolean(
          settings.smtpPassword,
        ),

      /* EMAIL */

      fromName:
        settings.fromName ?? "",

      fromEmail:
        settings.fromEmail ?? "",

      replyToEmail:
        settings.replyToEmail ?? "",

      adminEmail:
        settings.adminEmail ?? "",

      enabled:
        settings.enabled,

      /* BUSINESS DETAILS */

      businessPhone:
        settings.businessPhone ?? "",

      whatsappNumber:
        settings.whatsappNumber ?? "",

      websiteUrl:
        settings.websiteUrl ?? "",

      businessAddress:
        settings.businessAddress ?? "",

      /* NOTIFICATION SETTINGS */

      sendAdminEmail:
        settings.sendAdminEmail,

      sendCustomerAutoReply:
        settings.sendCustomerAutoReply,

      sendWhatsappNotification:
        settings.sendWhatsappNotification,

      /* META */

      updatedAt:
        settings.updatedAt,
    };
  }

  /* =======================================================
     UPDATE SETTINGS
  ======================================================= */

  async update(
    dto: UpdateMailSettingsDto,
  ) {
    const current =
      await this.getSettings();

    const data = {
      /* SMTP */

      smtpHost:
        dto.smtpHost !== undefined
          ? dto.smtpHost.trim() || null
          : undefined,

      smtpPort:
        dto.smtpPort,

      smtpSecure:
        dto.smtpSecure,

      smtpUsername:
        dto.smtpUsername !== undefined
          ? dto.smtpUsername.trim() ||
            null
          : undefined,

      /*
       * Empty SMTP password means:
       * keep the currently stored password.
       */
      smtpPassword:
        dto.smtpPassword !== undefined &&
        dto.smtpPassword.trim()
          ? dto.smtpPassword.trim()
          : undefined,

      /* EMAIL */

      fromName:
        dto.fromName !== undefined
          ? dto.fromName.trim() ||
            null
          : undefined,

      fromEmail:
        dto.fromEmail !== undefined
          ? dto.fromEmail.trim() ||
            null
          : undefined,

      replyToEmail:
        dto.replyToEmail !== undefined
          ? dto.replyToEmail.trim() ||
            null
          : undefined,

      adminEmail:
        dto.adminEmail !== undefined
          ? dto.adminEmail.trim() ||
            null
          : undefined,

      enabled:
        dto.enabled,

      /* BUSINESS DETAILS */

      businessPhone:
        dto.businessPhone !== undefined
          ? dto.businessPhone.trim() ||
            null
          : undefined,

      whatsappNumber:
        dto.whatsappNumber !== undefined
          ? dto.whatsappNumber.trim() ||
            null
          : undefined,

      websiteUrl:
        dto.websiteUrl !== undefined
          ? dto.websiteUrl.trim() ||
            null
          : undefined,

      businessAddress:
        dto.businessAddress !== undefined
          ? dto.businessAddress.trim() ||
            null
          : undefined,

      /* NOTIFICATION SETTINGS */

      sendAdminEmail:
        dto.sendAdminEmail,

      sendCustomerAutoReply:
        dto.sendCustomerAutoReply,

      sendWhatsappNotification:
        dto.sendWhatsappNotification,
    };

    await this.prisma.mailSettings.update({
      where: {
        id: current.id,
      },

      data,
    });

    return this.getSafeSettings();
  }

  /* =======================================================
     INTERNAL SETTINGS FOR MAIL / WHATSAPP SERVICES
  ======================================================= */

  async getInternalSettings() {
    return this.getSettings();
  }
}