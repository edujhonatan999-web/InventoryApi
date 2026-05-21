import { IsString, IsInt, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateProductDto {

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  category_id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_quantity?: number;
}