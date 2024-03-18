import { createActionGroup, props } from '@ngrx/store';

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'Toast Error': props<{ message: string }>(),
    'Toast Info': props<{ message: string }>(),
    'Toast Success': props<{ message: string }>(),
    'Toast Warning': props<{ message: string }>(),
  },
});
