import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category.model';

@Entity({ name: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  amount!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
