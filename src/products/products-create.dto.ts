import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @MaxLength(100)
  name!: string;

  @IsInt()
  @Min(1)
  category_id!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_quantity?: number;
}