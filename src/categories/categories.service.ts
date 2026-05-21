import { Injectable } from '@nestjs/common';
import { Category } from './cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './cat-create.dto';
import { UpdateCategoryDto } from './cat-update.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}
    //metodo para obtener todas las categorias
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }
    //metodo para obtener una categoria por su id
    async findOne(id: number): Promise<Category | null> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            return null;
        }
        return category;
    }
    //metodo para obtener una categoria por su nombre
    async findByName(name: string): Promise<Category | null> {
        const category = await this.categoryRepository.findOneBy({ name });
        if (!category) {
            return null;
        }
        return category;
    }
    //metodo para crear una categoria
    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    //metodo para actualizar una categoria
    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
        const category = await this.findOne(id);
        if (!category) {
            return null;
        }
        this.categoryRepository.merge(category, updateCategoryDto);
        return this.categoryRepository.save(category);
    }
    //metodo para eliminar una categoria
    async delete(id: number): Promise<boolean> {
        const category = await this.findOne(id);
        if (!category) {
            return false;
        }
        await this.categoryRepository.remove(category);
        return true;
    }
}



