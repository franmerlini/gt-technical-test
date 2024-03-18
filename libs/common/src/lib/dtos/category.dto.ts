import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
