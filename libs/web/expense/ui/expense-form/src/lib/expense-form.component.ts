import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CreateExpenseDto,
  Expense,
  SelectItem,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

type ExpenseForm = {
  name: FormControl<string>;
  category: FormControl<number>;
  date: FormControl<string>;
  amount: FormControl<number>;
};

@Component({
  selector: 'gt-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1 class="text-2xl">{{ expense ? 'Edit expense' : 'Add expense' }}</h1>

    <form
      class="flex flex-col gap-4"
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Expense</span>
        </div>
        <input
          type="text"
          class="input input-bordered w-full"
          formControlName="name"
        />
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Category</span>
        </div>
        <select
          class="select select-bordered w-full"
          formControlName="category"
        >
          <option disabled value="0">Category</option>
          @for(category of categoryList; track category.id) {
          <option [value]="category.id">{{ category.name }}</option>
          }
        </select>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Payment date</span>
        </div>
        <input
          type="date"
          placeholder="Payment date"
          class="input input-bordered w-full"
          formControlName="date"
        />
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Amount</span>
        </div>
        <input
          type="number"
          class="input input-bordered w-full"
          formControlName="amount"
        />
      </label>

      <div class="flex justify-end gap-2">
        <button type="button" class="btn btn-secondary mt-4">Reset</button>
        <button type="submit" class="btn btn-primary mt-4">
          @if(loading) {
          <span class="loading loading-spinner"></span>
          } @else {
          {{ expense ? 'Update' : 'Add' }}
          }
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseFormComponent implements OnChanges {
  @Input({ required: true }) categoryList: SelectItem[] | undefined;
  @Input() expense: Expense | undefined;
  @Input() loading = false;

  @Output() add = new EventEmitter<CreateExpenseDto>();
  @Output() update = new EventEmitter<UpdateExpenseDto>();
  @Output() formError = new EventEmitter<string>();

  #fb = inject(NonNullableFormBuilder);

  form = this.#fb.group<ExpenseForm>({
    name: this.#fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    category: this.#fb.control(0, [Validators.required, Validators.min(1)]),
    date: this.#fb.control(
      new Date().toISOString().substring(0, 10),
      Validators.required
    ),
    amount: this.#fb.control(0, [Validators.required, Validators.min(1)]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    const expense = changes['expense']?.currentValue as Expense;
    if (expense) {
      const { name, category, date, amount } = expense;
      this.form.patchValue({
        name,
        category: category.id,
        date: new Date(date).toISOString().substring(0, 10),
        amount,
      });
    }
  }

  onSubmit(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.formError.emit('Check the form fields and try again.');
      return;
    }

    const { name, category, date, amount } = this.form.getRawValue();

    const createExpenseDto: CreateExpenseDto = {
      name,
      category: this.categoryList?.find(
        ({ id }) => id === +category
      ) as SelectItem,
      date: new Date(date),
      amount,
    };

    if (this.expense) {
      this.update.emit({
        id: this.expense.id,
        ...createExpenseDto,
      });
      return;
    }

    this.add.emit(createExpenseDto);
  }
}
