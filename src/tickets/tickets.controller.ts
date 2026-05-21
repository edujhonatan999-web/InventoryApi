import { Controller, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './ticket-create.dto';
import { UpdateTicketDto } from './ticket-update.dto';
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }
  @Get(':id')
  findOne(id: number) {
    return this.ticketsService.findOne(id);
  }
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }
  @Put(':id')
  update(id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }
  @Delete(':id')
  remove(id: number) {
    return this.ticketsService.remove(id);
  }

}
