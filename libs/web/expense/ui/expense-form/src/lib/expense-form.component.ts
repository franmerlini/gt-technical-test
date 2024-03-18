import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CreateExpenseDto, Expense, SelectItem, UpdateExpenseDto } from '@gt-technical-test/libs/common';
import { InputComponent, SelectComponent } from '@gt-technical-test/libs/web/shared/ui';
import { CustomValidators } from '@gt-technical-test/libs/web/shared/util';

type ExpenseForm = {
  name: FormControl<string>;
  category: FormControl<number>;
  date: FormControl<string>;
  amount: FormControl<string>;
};

@Component({
  selector: 'gt-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, SelectComponent],
  template: `
    <form
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      ngForm
    >
      <gt-input
        ngDefaultControl
        [type]="'text'"
        [placeholder]="'Expense'"
        [formControlName]="'name'"
        [formControl]="name"
        class="w-full"
      ></gt-input>

      <gt-select
        ngDefaultControl
        [list]="categoryList"
        [placeholder]="'Category'"
        [formControlName]="'category'"
        [formControl]="category"
        class="w-full"
      ></gt-select>

      <gt-input
        ngDefaultControl
        [type]="'date'"
        [placeholder]="'Payment date'"
        [formControlName]="'date'"
        [formControl]="date"
        class="w-full"
      ></gt-input>

      <gt-input
        ngDefaultControl
        [type]="'text'"
        [placeholder]="'Amount'"
        [formControlName]="'amount'"
        [formControl]="amount"
        class="w-full"
      ></gt-input>

      <div class="sm:col-span-2 md:col-span-3 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" class="btn btn-secondary" (click)="formGroupDirective.resetForm()">Reset</button>
        <button type="submit" class="btn btn-primary">
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
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  @Input({ required: true }) categoryList!: SelectItem[];
  @Input() expense: Expense | undefined;
  @Input() loading = false;

  @Output() add = new EventEmitter<CreateExpenseDto>();
  @Output() update = new EventEmitter<UpdateExpenseDto>();
  @Output() formError = new EventEmitter<string>();

  #fb = inject(NonNullableFormBuilder);

  form = this.#fb.group<ExpenseForm>({
    name: this.#fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    category: this.#fb.control(0, [CustomValidators.requiredSelectValidator, Validators.min(1)]),
    date: this.#fb.control(new Date().toISOString().substring(0, 10), Validators.required),
    amount: this.#fb.control('', [
      Validators.required,
      Validators.min(1),
      CustomValidators.rationalTwoDecimalsValidator,
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    const expense = changes['expense']?.currentValue as Expense;
    if (expense) {
      const { name, category, date, amount } = expense;
      this.form.patchValue({
        name,
        category: category.id,
        date: new Date(date).toISOString().substring(0, 10),
        amount: amount.toString(),
      });
    }
  }

  onSubmit(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formError.emit('Check the form fields and try again.');
      return;
    }

    const { name, category, date, amount } = this.form.getRawValue();

    const createExpenseDto: CreateExpenseDto = {
      name,
      category: this.categoryList?.find(({ id }) => id === +category) as SelectItem,
      date: new Date(date),
      amount: Number(amount),
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

  get name(): FormControl<string> {
    return this.form.get('name') as FormControl<string>;
  }

  get category(): FormControl<number> {
    return this.form.get('category') as FormControl<number>;
  }

  get date(): FormControl<string> {
    return this.form.get('date') as FormControl<string>;
  }

  get amount(): FormControl<string> {
    return this.form.get('amount') as FormControl<string>;
  }
}
