import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gt-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="navbar bg-primary text-primary-content">
      <a routerLink="/" class="btn btn-ghost text-xl">GT Technical Test</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
