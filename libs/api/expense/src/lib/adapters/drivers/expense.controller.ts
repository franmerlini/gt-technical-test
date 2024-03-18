import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

import { ExpenseService } from '../../domain';
import { ExpenseDriverPort } from '../../ports';

@Controller('expenses')
export class ExpenseController {
  constructor(
    @Inject(ExpenseService)
    private readonly expenseDriverPort: ExpenseDriverPort
  ) {}

  @Get(':id')
  getExpense(@Param('id') id: number): Promise<Expense> {
    return this.expenseDriverPort.getExpense(id);
  }

  @Get()
  getExpenses(): Promise<Expense[]> {
    return this.expenseDriverPort.getExpenses();
  }

  @Post()
  createExpense(@Body() body: CreateExpenseDto): Promise<Expense> {
    return this.expenseDriverPort.createExpense(body);
  }

  @Put(':id')
  updateExpense(
    @Param('id') id: number,
    @Body() body: UpdateExpenseDto
  ): Promise<Expense> {
    return this.expenseDriverPort.updateExpense(id, body);
  }

  @Delete(':id')
  deleteExpense(@Param('id') id: number): Promise<void> {
    return this.expenseDriverPort.deleteExpense(id);
  }
}
