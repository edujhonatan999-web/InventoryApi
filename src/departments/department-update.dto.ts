import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './department-create.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}