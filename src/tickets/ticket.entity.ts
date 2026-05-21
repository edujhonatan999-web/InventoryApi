import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '../products/product.entity'
import { User } from '../user/user.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
  })
  description!: string;

  @Column({
    nullable: true,
  })
  product_id!: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  location!: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending',
  })
  status!: 'pending' | 'in_progress' | 'resolved';

  @Column()
  requester_id!: number;

  @Column({
    nullable: true,
  })
  technician_id!: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requester_id' })
  requester!: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'technician_id' })
  technician!: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}