import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-expense-form',
  standalone: true,
  imports: [],
  template: `<p>expense-form works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseFormComponent {}
