import { Controller, Get, Post, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './department-create.dto';
import { UpdateDepartmentDto } from './department-update.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(Number(id));
  }
  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.departmentsService.findOneByName(name);
  }
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.createdepart(createDepartmentDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(Number(id), updateDepartmentDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(Number(id));
  }

}
