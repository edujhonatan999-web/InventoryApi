import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateCategoryDto } from '../categories/cat-create.dto';
import { UpdateCategoryDto } from '../categories/cat-update.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}
    //metodo para obtener todos los productos
    async findAll(): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['category'],
        });
        
    }
    //metodo para obtener un producto por su id
    async findOne(id: number): Promise<Product | null> {
        const product = await this.productRepository.findOneBy({ id });
        return product;
    }
    //metodo para obtener un producto por su nombre
    async findByName(name: string): Promise<Product | null> {
        const product = await this.productRepository.findOneBy({ name });
        return product;
    }
    //metodo para crear un producto
    async create(createProductDto: CreateCategoryDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }
    //metodo para actualizar un producto
    async update(id: number, updateProductDto: UpdateCategoryDto): Promise<Product | null> {
        const product = await this.findOne(id);
        if (!product) {
            return null;
        }
        this.productRepository.merge(product, updateProductDto);
        return this.productRepository.save(product);
    }
    //metodo para eliminar un producto
    async delete(id: number): Promise<boolean> {
        const product = await this.findOne(id);
        if (!product) {
            return false;
        }
        await this.productRepository.remove(product);
        return true;
    }
}
