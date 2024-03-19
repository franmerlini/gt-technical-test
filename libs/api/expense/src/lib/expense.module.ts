import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity, ExpenseEntity } from '@gt-technical-test/libs/api/database';

import { CategoryController, CategoryDrivenAdapter, ExpenseController, ExpenseDrivenAdapter } from './adapters';
import { CategoryService, ExpenseService } from './domain';

@Module({
  controllers: [ExpenseController, CategoryController],
  imports: [TypeOrmModule.forFeature([ExpenseEntity, CategoryEntity])],
  providers: [ExpenseService, ExpenseDrivenAdapter, CategoryService, CategoryDrivenAdapter],
  exports: [ExpenseService, CategoryService],
})
export class ExpenseModule {}
