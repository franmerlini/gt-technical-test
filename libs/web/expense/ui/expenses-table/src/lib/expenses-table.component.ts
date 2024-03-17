import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Expense } from '@gt-technical-test/libs/common';

@Component({
  selector: 'gt-expenses-table',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Code</th>
            <th class="min-w-32">Name</th>
            <th class="min-w-32">Category</th>
            <th>Payment date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          @for(expense of expenses; track expense.id) {
          <tr>
            <td>{{ expense.id }}</td>
            <td>{{ expense.name }}</td>
            <td>
              <div class="badge">
                {{ expense.category.name }}
              </div>
            </td>
            <td>{{ expense.date | date : 'dd/MM/yyyy' }}</td>
            <td>{{ expense.amount | currency : 'USD' }}</td>
            <td class="flex gap-2">
              <div class="tooltip" data-tip="Edit">
                <button class="btn btn-circle" (click)="edit.emit(expense.id)">
                  <svg
                    class="w-4 h-4"
                    stroke-linejoin="round"
                    viewBox="0 0 16 16"
                    style="color: currentcolor;"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.75 0.189331L12.2803 0.719661L15.2803 3.71966L15.8107 4.24999L15.2803 4.78032L5.15901 14.9016C4.45575 15.6049 3.50192 16 2.50736 16H0.75H0V15.25V13.4926C0 12.4981 0.395088 11.5442 1.09835 10.841L11.2197 0.719661L11.75 0.189331ZM11.75 2.31065L9.81066 4.24999L11.75 6.18933L13.6893 4.24999L11.75 2.31065ZM2.15901 11.9016L8.75 5.31065L10.6893 7.24999L4.09835 13.841C3.67639 14.2629 3.1041 14.5 2.50736 14.5H1.5V13.4926C1.5 12.8959 1.73705 12.3236 2.15901 11.9016ZM9 16H16V14.5H9V16Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="tooltip" data-tip="Delete">
                <button
                  class="btn btn-circle"
                  (click)="delete.emit(expense.id)"
                >
                  <svg
                    class="w-4 h-4"
                    stroke-linejoin="round"
                    viewBox="0 0 16 16"
                    style="color: currentcolor;"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          }
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {{ calculateTotal(expenses) | currency : 'USD' }}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesTableComponent {
  @Input({ required: true }) expenses: Expense[] = [];

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  calculateTotal(expenses: Expense[]): number {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }
}
