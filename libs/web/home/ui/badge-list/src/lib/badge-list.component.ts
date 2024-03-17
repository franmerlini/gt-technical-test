import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Badge } from '@gt-technical-test/libs/common';

@Component({
  selector: 'gt-badge-list',
  standalone: true,
  template: `
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 justify-items-center gap-4"
    >
      @for(badge of badges; track badge.id) {
      <div class="badge badge-neutral gap-2 justify-self-center">
        {{ badge.label }}
      </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeListComponent {
  @Input({ required: true }) badges: Badge[] = [];
}
