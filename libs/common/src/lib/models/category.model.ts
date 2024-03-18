import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { SelectItem } from './select-item.model';

@Entity({ name: 'categories' })
export class Category implements SelectItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
