  import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Min,
  } from 'class-validator';

  export enum MovementType {
    IN = 'in',
    OUT = 'out',
  }

  export class CreateMovementDto {

    @IsInt()
    @Min(1)
    product_id!: number;

    @IsInt()
    @Min(1)
    department_id!: number;

    @IsInt()
    @Min(1)
    quantity!: number;

    @IsEnum(MovementType)
    movement_type!: MovementType;

    @IsOptional()
    @IsString()
    description?: string;
  }