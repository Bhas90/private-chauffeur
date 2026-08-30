import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateFleetPopupDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fleetVehicleId?: number | null;

  @IsOptional()
  @IsString()
  eyebrow?: string | null;

  @IsOptional()
  @IsString()
  heading?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  image?: string | null;

  @IsOptional()
  @IsString()
  video?: string | null;

  @IsOptional()
  @IsString()
  ctaText?: string | null;

  @IsOptional()
  @IsString()
  ctaLink?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  showDelay?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayDuration?: number;

  @IsOptional()
  @IsBoolean()
  oncePerSession?: boolean;
}
