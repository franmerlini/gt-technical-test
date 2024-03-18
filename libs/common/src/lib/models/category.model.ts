import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { SelectItem } from './select-item.model';

export class Category implements SelectItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
