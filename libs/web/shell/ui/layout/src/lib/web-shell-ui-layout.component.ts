import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gt-web-shell-ui-layout',
  standalone: true,
  imports: [CommonModule],
  template: `<p>web-shell-ui-layout works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebShellUiLayoutComponent {}
