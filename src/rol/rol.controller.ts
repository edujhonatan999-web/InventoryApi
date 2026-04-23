import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { UpdateRoleDto } from './rol-update.dto';
import { CreateRoleDto } from './rol-create.dto';
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  async findAll() {
    return this.rolService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rolService.findOne(id);
  }
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolService.create(createRoleDto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolService.update(id, updateRoleDto);
  }
  
}
