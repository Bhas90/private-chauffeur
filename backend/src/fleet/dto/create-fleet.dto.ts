import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class FleetFeatureDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class FleetJourneyDto {
  @IsString()
  @IsNotEmpty()
  title!: string;
}

export class CreateFleetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  heroDescription!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  passengers!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  largeBags!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  cabinBags!: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @IsString()
  @IsNotEmpty()
  seoTitle!: string;

  @IsString()
  @IsNotEmpty()
  seoDescription!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FleetFeatureDto)
  features?: FleetFeatureDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FleetJourneyDto)
  recommendedJourneys?: FleetJourneyDto[];
}
