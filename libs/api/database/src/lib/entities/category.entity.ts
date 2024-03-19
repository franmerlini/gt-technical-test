import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { SelectItem } from '@gt-technical-test/libs/common';

@Entity({ name: 'categories' })
export class CategoryEntity implements SelectItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
