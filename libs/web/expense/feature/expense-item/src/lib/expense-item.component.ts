import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { combineLatest, map } from 'rxjs';

import { RouterLink } from '@angular/router';
import { CreateExpenseDto, UpdateExpenseDto } from '@gt-technical-test/libs/common';
import { CategoryFeature, ExpenseActions, ExpenseFeature } from '@gt-technical-test/libs/web/expense/data-access/store';
import { ExpenseFormComponent } from '@gt-technical-test/libs/web/expense/ui/expense-form';
import { ToastActions } from '@gt-technical-test/libs/web/shared/data-access/store';

@Component({
  selector: 'gt-expense-item',
  standalone: true,
  imports: [ExpenseFormComponent, AsyncPipe, RouterLink],
  template: `
    <div class="text-xl breadcrumbs">
      <ul>
        <li><a routerLink="/expenses">Expenses</a></li>
        <li>{{ (expense$ | async) ? 'Edit expense' : 'Add expense' }}</li>
      </ul>
    </div>

    @if(data$ | async; as data ) {
    <div class="mt-4">
      <gt-expense-form
        [categoryList]="data.categories"
        [expense]="data.expense"
        [loading]="data.loading"
        (add)="onAdd($event)"
        (update)="onUpdate($event)"
        (formError)="onFormError($event)"
      ></gt-expense-form>
    </div>
    }
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

  onFormError(message: string) {
    this.#store.dispatch(ToastActions.toastError({ message }));
  }
}
