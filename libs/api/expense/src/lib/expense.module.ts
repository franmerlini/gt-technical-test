import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category, Expense } from '@gt-technical-test/libs/common';

import {
  ExpenseController,
  ExpenseDrivenAdapter,
  ExpenseRepository,
} from './adapters';
import { ExpenseService } from './domain';

@Module({
  controllers: [ExpenseController],
  imports: [TypeOrmModule.forFeature([Expense, Category])],
  providers: [ExpenseService, ExpenseDrivenAdapter, ExpenseRepository],
  exports: [ExpenseService],
})
export class ExpenseModule {}
