import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  description!: string;

  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  location?: string;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'resolved'])
  status?: 'pending' | 'in_progress' | 'resolved';

  @IsInt()
  requester_id!: number;

  @IsOptional()
  @IsInt()
  technician_id?: number;
}