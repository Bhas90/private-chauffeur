import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class QuoteMailDto {
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
  serviceRequired!: string;

  @IsString()
  @IsNotEmpty()
  pickupDate!: string;

  @IsString()
  @IsNotEmpty()
  pickupTime!: string;

  @IsString()
  @IsNotEmpty()
  pickupLocation!: string;

  @IsString()
  @IsNotEmpty()
  destination!: string;

  @IsString()
  @IsNotEmpty()
  passengers!: string;

  @IsOptional()
  @IsString()
  tripType?: string;

  @IsOptional()
  @IsString()
  luggageRequirements?: string;

  @IsOptional()
  @IsString()
  preferredVehicle?: string;

  @IsOptional()
  @IsString()
  flightNumber?: string;

  @IsOptional()
  @IsString()
  additionalRequirements?: string;
}