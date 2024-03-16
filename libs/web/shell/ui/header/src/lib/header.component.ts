import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-header',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="navbar bg-primary text-primary-content"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
