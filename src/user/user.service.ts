import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user-create.dot';
import { UpdateUserDto } from './user-update.dot';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Método para obtener un usuario por su ID
  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    return user;
  }
  // Método para obtener un usuario por su nombre de usuario
  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      return null;
    }
    return user;
  }

  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Método para actualizar un usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Método para eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
