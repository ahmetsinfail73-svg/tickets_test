import { FormControl } from '@angular/forms';
import { IField } from '../../models/field.model';
import { ISelectItem } from '../../models/select-item.model';

export interface IInputProps extends IField {
  control: FormControl;
}

export interface ISelectProps extends IInputProps {
  items: ISelectItem[];
}

export type TypeInput = IInputProps & Partial<ISelectProps>;
