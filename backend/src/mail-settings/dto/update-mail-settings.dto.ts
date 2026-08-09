import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateMailSettingsDto {
  /* =======================================================
     SMTP
  ======================================================= */

  @IsOptional()
  @IsString()
  smtpHost?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  smtpPort?: number;

  @IsOptional()
  @IsBoolean()
  smtpSecure?: boolean;

  @IsOptional()
  @IsString()
  smtpUsername?: string;

  @IsOptional()
  @IsString()
  smtpPassword?: string;

  /* =======================================================
     EMAIL
  ======================================================= */

  @IsOptional()
  @IsString()
  fromName?: string;

  @IsOptional()
  @IsEmail()
  fromEmail?: string;

  @IsOptional()
  @IsEmail()
  replyToEmail?: string;

  @IsOptional()
  @IsEmail()
  adminEmail?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  /* =======================================================
     BUSINESS DETAILS
  ======================================================= */

  @IsOptional()
  @IsString()
  businessPhone?: string;

  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @IsOptional()
  @IsUrl({
    require_protocol: true,
  })
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  businessAddress?: string;

  /* =======================================================
     NOTIFICATION CONTROLS
  ======================================================= */

  @IsOptional()
  @IsBoolean()
  sendAdminEmail?: boolean;

  @IsOptional()
  @IsBoolean()
  sendCustomerAutoReply?: boolean;

  @IsOptional()
  @IsBoolean()
  sendWhatsappNotification?: boolean;
}