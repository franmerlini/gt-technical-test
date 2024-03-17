import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

export const ExpenseActions = createActionGroup({
  source: 'Expense/API',
  events: {
    'Load Expenses': emptyProps(),
    'Load Expenses Success': props<{ expenses: Expense[] }>(),
    'Load Expenses Failure': props<{ error: string }>(),

    'Create Expense': props<{ expense: CreateExpenseDto }>(),
    'Create Expense Success': props<{ expense: Expense }>(),
    'Create Expense Failure': props<{ error: string }>(),

    'Update Expense': props<{ expense: UpdateExpenseDto }>(),
    'Update Expense Success': props<{ expense: Expense }>(),
    'Update Expense Failure': props<{ error: string }>(),

    'Delete Expense': props<{ expenseId: number }>(),
    'Delete Expense Confirmation': props<{ expenseId: number }>(),
    'Delete Expense Success': props<{ expenseId: number }>(),
    'Delete Expense Failure': props<{ error: string }>(),
  },
});
