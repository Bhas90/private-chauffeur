import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export enum FleetMediaTypeDto {
  COVER = "COVER",
  EXTERIOR = "EXTERIOR",
  INTERIOR = "INTERIOR",
  VIDEO = "VIDEO",
}

export class CreateFleetMediaDto {
  @IsEnum(FleetMediaTypeDto)
  type!: FleetMediaTypeDto;

  @IsString()
  @IsNotEmpty()
  url!: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
