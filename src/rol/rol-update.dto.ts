import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './rol-create.dto';


export class UpdateRoleDto extends PartialType(CreateRoleDto) {}