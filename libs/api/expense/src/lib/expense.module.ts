import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category, Expense } from '@gt-technical-test/libs/common';

import {
  CategoryController,
  CategoryDrivenAdapter,
  ExpenseController,
  ExpenseDrivenAdapter,
} from './adapters';
import { CategoryService, ExpenseService } from './domain';

@Module({
  controllers: [ExpenseController, CategoryController],
  imports: [TypeOrmModule.forFeature([Expense, Category])],
  providers: [
    ExpenseService,
    ExpenseDrivenAdapter,
    CategoryService,
    CategoryDrivenAdapter,
  ],
  exports: [ExpenseService, CategoryService],
})
export class ExpenseModule {}
