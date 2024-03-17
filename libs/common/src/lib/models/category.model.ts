import { Color } from '../enums';
import { SelectItem } from './select-item.model';

export type Category = SelectItem & {
  color: Color;
};
