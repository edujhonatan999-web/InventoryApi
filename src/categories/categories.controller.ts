import { Controller, Body, Get, Param, Post, Put, Delete, UseGuards  } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './cat-create.dto';
import { UpdateCategoryDto } from './cat-update.dto';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }
  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return this.categoriesService.findByName(name);
  }
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
  
}
