import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CategoryDto } from './category.dto';

export class UpdateExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsDate()
  date!: Date;

  @IsOptional()
  @ValidateNested()
  category!: CategoryDto;
}
