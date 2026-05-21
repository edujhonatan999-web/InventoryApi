import { Controller,  Body, Get, Param, Post, Put, Delete, UseGuards  } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCategoryDto } from '../categories/cat-create.dto';
import { UpdateCategoryDto } from '../categories/cat-update.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }
  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }
  @Post()
  async create(@Body() createProductDto: CreateCategoryDto) {
    return this.productsService.create(createProductDto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateCategoryDto) {
    return this.productsService.update(id, updateProductDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
