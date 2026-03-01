import { FormGroup } from '@angular/forms';
import { TypeInput } from '../components/inputs/input-props.types';
import { IField } from '../models/field.model';
import { getFormControl } from './get-form-control.util';

export const createInputList = (fields: IField[], form: FormGroup): TypeInput[] => {
  return fields.map((field) => ({
    ...field,
    control: getFormControl(form, field.key),
  }));
};
