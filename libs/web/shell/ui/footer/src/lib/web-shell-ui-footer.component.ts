import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gt-web-shell-ui-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<p>web-shell-ui-footer works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebShellUiFooterComponent {}
