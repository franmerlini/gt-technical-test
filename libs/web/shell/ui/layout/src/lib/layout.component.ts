import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@front/libs/web/shell/ui/footer';
import { HeaderComponent } from '@front/libs/web/shell/ui/header';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <gt-header />

      <main class="flex-1">
        <router-outlet />
      </main>

      <gt-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
