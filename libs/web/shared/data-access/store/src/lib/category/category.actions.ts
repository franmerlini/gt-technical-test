import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { SelectItem } from '@gt-technical-test/libs/common';

export const CategoryActions = createActionGroup({
  source: 'Category/API',
  events: {
    'Load Categories': emptyProps(),
    'Load Categories Success': props<{ categories: SelectItem[] }>(),
    'Load Categories Failure': props<{ error: string }>(),
  },
});
