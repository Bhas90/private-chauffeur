import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export enum BlogStatusDto {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  excerpt!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsString()
  @IsNotEmpty()
  readingTime!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsEnum(BlogStatusDto)
  status?: BlogStatusDto;

  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @IsString()
  @IsNotEmpty()
  seoTitle!: string;

  @IsString()
  @IsNotEmpty()
  seoDescription!: string;

  @IsArray()
  sections!: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];

  @IsOptional()
  @IsArray()
  faqs?: {
    question: string;
    answer: string;
  }[];

  @IsArray()
  @IsString({ each: true })
  relatedServiceSlugs!: string[];

  @IsArray()
  @IsString({ each: true })
  relatedFleetSlugs!: string[];

  @IsArray()
  @IsString({ each: true })
  relatedAreaSlugs!: string[];
}