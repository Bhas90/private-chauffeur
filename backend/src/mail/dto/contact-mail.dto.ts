import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class ContactMailDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  mobile!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsOptional()
  @IsString()
  service?: string;

  @IsString()
  @IsIn([
    "phone",
    "email",
    "whatsapp",
  ])
  preferredContact!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}