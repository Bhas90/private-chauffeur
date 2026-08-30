import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
} from "class-validator";

export class OrderFleetMediaDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  mediaIds!: number[];
}
