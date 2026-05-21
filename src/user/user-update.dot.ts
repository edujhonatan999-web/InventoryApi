import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user-create.dot';

export class UpdateUserDto extends PartialType(CreateUserDto) {}