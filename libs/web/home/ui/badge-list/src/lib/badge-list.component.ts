import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gt-badge-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>web-home-ui-badge-list works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeListComponent {}
