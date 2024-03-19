import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';

@Entity({ name: 'expenses' })
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  amount!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;
}
