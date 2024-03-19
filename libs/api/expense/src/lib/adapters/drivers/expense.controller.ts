import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { ExpenseEntity } from '@gt-technical-test/libs/api/database';
import { CreateExpenseDto, UpdateExpenseDto } from '@gt-technical-test/libs/common';

import { ExpenseService } from '../../domain';
import { ExpenseDriverPort } from '../../ports';

@Controller('expenses')
export class ExpenseController {
  constructor(
    @Inject(ExpenseService)
    private readonly expenseDriverPort: ExpenseDriverPort
  ) {}

  @Get(':id')
  getExpense(@Param('id') id: number): Promise<ExpenseEntity> {
    return this.expenseDriverPort.getExpense(id);
  }

  @Get()
  getExpenses(): Promise<ExpenseEntity[]> {
    return this.expenseDriverPort.getExpenses();
  }

  @Post()
  createExpense(@Body() body: CreateExpenseDto): Promise<ExpenseEntity> {
    return this.expenseDriverPort.createExpense(body);
  }

  @Put(':id')
  updateExpense(@Param('id') id: number, @Body() body: UpdateExpenseDto): Promise<ExpenseEntity> {
    return this.expenseDriverPort.updateExpense(id, body);
  }

  @Delete(':id')
  deleteExpense(@Param('id') id: number): Promise<number> {
    return this.expenseDriverPort.deleteExpense(id);
  }
}
