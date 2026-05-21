import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '../products/product.entity';
import { Department } from '../departments/department.entity';

export enum MovementType {
  IN = 'in',
  OUT = 'out',
}

@Entity('movements')
export class Movement {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @Column()
  department_id!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column()
  quantity!: number;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  movement_type!: MovementType;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  movement_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Department)
@JoinColumn({ name: 'department_id' })
department!: Department;
}