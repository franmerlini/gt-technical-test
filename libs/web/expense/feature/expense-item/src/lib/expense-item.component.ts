import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { combineLatest, map } from 'rxjs';

import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';
import {
  CategoryFeature,
  ExpenseActions,
  ExpenseFeature,
} from '@gt-technical-test/libs/web/expense/data-access/store';
import { ExpenseFormComponent } from '@gt-technical-test/libs/web/expense/ui/expense-form';

@Component({
  selector: 'gt-expense-item',
  standalone: true,
  imports: [ExpenseFormComponent, AsyncPipe],
  template: `
    <div>
      @if(data$ | async; as data ) {
      <gt-expense-form
        [categoryList]="data.categories"
        [expense]="data.expense"
        [loading]="data.loading"
        (add)="onAdd($event)"
        (update)="onUpdate($event)"
        (formError)="onFormError($event)"
      ></gt-expense-form>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseItemComponent {
  #store = inject(Store);

  categories$ = this.#store.select(CategoryFeature.selectAll);
  expense$ = this.#store.select(ExpenseFeature.selectActive);
  loading$ = this.#store.select(ExpenseFeature.selectLoading);
  data$ = combineLatest([this.categories$, this.expense$, this.loading$]).pipe(
    map(([categories, expense, loading]) => ({ categories, expense, loading }))
  );

  onAdd(expense: CreateExpenseDto) {
    this.#store.dispatch(ExpenseActions.createExpense({ expense }));
  }

  onUpdate(expense: UpdateExpenseDto) {
    this.#store.dispatch(ExpenseActions.updateExpense({ expense }));
  }

  onFormError(error: string) {
    console.log(error);
  }
}
