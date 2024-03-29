import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@gt-technical-test/libs/web/shell/ui/footer';
import { HeaderComponent } from '@gt-technical-test/libs/web/shell/ui/header';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="h-screen flex flex-col">
      <gt-header />

      <main class="flex-1 flex justify-center py-8 px-4">
        <div class="container">
          <router-outlet />
        </div>
      </main>

      <gt-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
