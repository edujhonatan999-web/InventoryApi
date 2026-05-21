import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './department-create.dto';
import { UpdateDepartmentDto } from './department-update.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}
  // buscar todos los departamentos
  async findAll(): Promise<Department[]> {
    return this.departmentsRepository.find();
  }
  // buscar un departamento por nombre
  async findOneByName(name: string): Promise<Department | null> {
    return this.departmentsRepository.findOneBy({ name });
  }
    // buscar un departamento por id
    async findOne(id: number): Promise<Department | null> {
    return this.departmentsRepository.findOneBy({ id });
    }

  // crear un departamento
    async createdepart(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentsRepository.create(createDepartmentDto);
    return this.departmentsRepository.save(department);
  }
    // actualizar un departamento
    async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    const department = await this.findOne(id);
    if (!department) {
      return null;
    }
    Object.assign(department, updateDepartmentDto);
    return this.departmentsRepository.save(department);
  }
    // eliminar un departamento por id
    async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);
    if (!department) {
      return false;
    }
    await this.departmentsRepository.remove(department);
    return true;
  }




}

