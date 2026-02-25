import { ValidatorFn } from '@angular/forms';
import { ISelectItem } from './select-item.model';

export interface IField {
  key: string;
  label: string;
  placeholder?: string;
  icon: string;
  isTextarea?: boolean;
  items?: ISelectItem[];
  validators?: ValidatorFn[];
  defaultValue?: any;
}
