import { Controller, Body, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './movement-create.dto';
import { UpdateMovementDto } from './movement-update.dto';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Get()
  async findAll() {
    return this.movementsService.findAll();
  }
  @Get('date/:date')
  async findByDate(@Param('date') date: string) {
    return this.movementsService.findByDate(new Date(date));
  }
  @Post()
  async create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMovementDto: UpdateMovementDto) {
    return this.movementsService.update(id, updateMovementDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.movementsService.remove(id);
  }
}
