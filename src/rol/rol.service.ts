import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './rol.entity';
import { CreateRoleDto } from './rol-create.dto';
import { UpdateRoleDto } from './rol-update.dto';
@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

    // Método para obtener todos los roles
    // GET all roles
    async findAll(): Promise<Role[]> {
    const roles = await this.roleRepository.find();
    return roles;
  }

    // Método para obtener un rol por su ID
    // GET role by ID
    async findOne(id: number): Promise<Role> {
  const role = await this.roleRepository.findOneBy({ id });

  if (!role) {
    throw new Error('Role no encontrado');
  }

  return role;
}
    // Método para crear un nuevo rol
    // POST create new role
    async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }
    // Método para actualizar un rol existente
    // PUT update existing role
    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) {
      throw new Error('Role no encontrado');
    }
    this.roleRepository.merge(role, updateRoleDto);
    return this.roleRepository.save(role);
  }
}
