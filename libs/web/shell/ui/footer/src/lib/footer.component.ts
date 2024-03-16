import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<p>footer works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
