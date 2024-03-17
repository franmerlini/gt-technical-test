import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-expenses',
  standalone: true,
  imports: [CommonModule],
  template: `<p>web-expense-feature-expenses works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {}
