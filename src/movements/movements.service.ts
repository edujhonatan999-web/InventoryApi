import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './movement.entity';
import { CreateMovementDto } from './movement-create.dto';
import { UpdateMovementDto } from './movement-update.dto';
import { Department } from '../departments/department.entity';
@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}

  // metodo para obtener todos los movimientos
  async findAll(): Promise<Movement[]> {
    return this.movementRepository.createQueryBuilder('movement')
    .leftJoinAndSelect('movement.product', 'product')
    .leftJoinAndSelect('movement.department', 'department')
    .select([
      'movement.id',
      'movement.quantity',
      'movement.movement_type',
      'movement.description',
      'movement.movement_date',
      'movement.created_at',
      'movement.updated_at',
      
      'product.id',
      'product.name',
      'department.id',
      'department.name'
    ])
    .getMany();
  }
  // metodo para obtener un movimiento por fecha
  async findByDate(date: Date): Promise<Movement[]> {
    return this.movementRepository.find({
      where: { movement_date: date },
      relations: ['product'],
    });
  }
  // metodo para crear un movimiento
  async create(createMovementDto: CreateMovementDto): Promise<Movement> {
    const movement = this.movementRepository.create(createMovementDto);
    return this.movementRepository.save(movement);
  }
  // metodo para actualizar un movimiento
  async update(id: number, updateMovementDto: UpdateMovementDto): Promise<Movement> {
    await this.movementRepository.update(id, updateMovementDto);
    const movement = await this.movementRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!movement) {
      throw new NotFoundException(`Movement with id ${id} not found`);
    }
    return movement;
  }
  // metodo para eliminar un movimiento
  async remove(id: number): Promise<void> {
    await this.movementRepository.delete(id);
  }



}
