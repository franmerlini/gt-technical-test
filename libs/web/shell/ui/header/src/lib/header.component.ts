import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-header',
  standalone: true,
  imports: [CommonModule],
  template: `<p>header works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
