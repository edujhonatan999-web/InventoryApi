import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementDto } from './movement-create.dto';

export class UpdateMovementDto extends PartialType(CreateMovementDto) {}