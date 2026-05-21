import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './ticket-create.dto';
import { UpdateTicketDto } from './ticket-update.dto';
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}
  // obtener todos los tickets 
    async findAll(): Promise<Ticket[]> {
  return this.ticketsRepository.find({
    relations: {
      product: true,
      requester: true,
      technician: true,
    },
    select: {
      id: true,
      description: true,
      product_id: true,
      location: true,
      status: true,
      requester_id: true,
      technician_id: true,
      created_at: true,
      updated_at: true,

      product: {
        id: true,
        name: true,
      },

      requester: {
        username: true,
      },

      technician: {
        username: true,
      },
    },
  });
}
    // obtener un ticket por id
    async findOne(id: number): Promise<Ticket | null> {
    return this.ticketsRepository.findOneBy({ id });
    }
    // crear un nuevo ticket
    async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(ticket);
    }
    // actualizar un ticket existente
    async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    await this.ticketsRepository.update(id, updateTicketDto);
    return this.findOne(id) as Promise<Ticket>;
    }
    // eliminar un ticket existente
    async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
    }
    

}
