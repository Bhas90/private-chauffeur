import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class ReportProblemMailDto {
  /* =======================================================
     CUSTOMER
  ======================================================= */

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  /* =======================================================
     BOOKING / JOURNEY
  ======================================================= */

  @IsOptional()
  @IsString()
  bookingReference?: string;

  @IsOptional()
  @IsString()
  journeyDate?: string;

  /* =======================================================
     PROBLEM DETAILS
  ======================================================= */

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  /* =======================================================
     CONTACT PREFERENCE
  ======================================================= */

  @IsString()
  @IsIn([
    "phone",
    "email",
    "whatsapp",
  ])
  preferredContact!: string;
}