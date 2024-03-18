import { IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

import { CategoryDto } from './category.dto';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsDate()
  date!: Date;

  @IsNotEmpty()
  @ValidateNested()
  category!: CategoryDto;
}
