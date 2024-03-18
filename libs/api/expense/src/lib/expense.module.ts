import { Module } from '@nestjs/common';

import {
  ExpenseController,
  ExpenseDrivenAdapter,
  ExpenseRepository,
} from './adapters';
import { ExpenseService } from './domain';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseDrivenAdapter, ExpenseRepository],
  exports: [ExpenseService],
})
export class ExpenseModule {}
