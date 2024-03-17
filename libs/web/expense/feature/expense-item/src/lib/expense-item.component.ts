import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-expense-item',
  standalone: true,
  imports: [],
  template: `<p>expense-item works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseItemComponent {}
