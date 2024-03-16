import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gt-web-shell-ui-header',
  standalone: true,
  imports: [CommonModule],
  template: `<p>web-shell-ui-header works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebShellUiHeaderComponent {}
