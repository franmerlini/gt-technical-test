import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-expenses-table',
  standalone: true,
  imports: [],
  template: `<p>web-expense-ui-expenses-table works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesTableComponent {}
