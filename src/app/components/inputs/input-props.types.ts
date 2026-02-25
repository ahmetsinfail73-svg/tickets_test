import { FormControl } from '@angular/forms';
import { ISelectItem } from '../../models/select-item.model';

export interface IInputProps {
  label: string;
  placeholder?: string;
  control: FormControl;
  icon: string;
  defaultValue?: string;
  isTextarea?: boolean;
}

export interface ISelectProps extends IInputProps {
  items: ISelectItem[];
}

export type TypeInput = IInputProps & Partial<ISelectProps>;
