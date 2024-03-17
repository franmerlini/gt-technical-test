import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BadgeListComponent } from '@gt-technical-test/libs/web/home/ui/badge-list';

@Component({
  standalone: true,
  imports: [BadgeListComponent, RouterLink],
  template: `
    <div class="flex flex-col items-center gap-16">
      <div class="flex flex-col gap-6 items-center">
        <h1 class="text-6xl font-bold">GT Technical Test</h1>
        <p class="text-xl">A simple application to prove technical skills</p>
        <a routerLink="/expenses" role="button" class="btn btn-primary"
          >Get started</a
        >
      </div>

      <div class="flex flex-col gap-2 items-center">
        <p>Created using</p>
        <gt-badge-list [badges]="badges"></gt-badge-list>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  badges = [
    {
      id: 1,
      label: 'Angular',
      image: '',
    },
    {
      id: 2,
      label: 'DaisyUI',
      image: '',
    },
    {
      id: 3,
      label: 'NestJS',
      image: '',
    },
    {
      id: 4,
      label: 'NgRx',
      image: '',
    },
    {
      id: 5,
      label: 'NodeJS',
      image: '',
    },
    {
      id: 6,
      label: 'RxJs',
      image: '',
    },
    {
      id: 7,
      label: 'TailwindCSS',
      image: '',
    },
    {
      id: 8,
      label: 'TypeORM',
      image: '',
    },
    {
      id: 9,
      label: 'TypeScript',
      image: '',
    },
  ];
}
