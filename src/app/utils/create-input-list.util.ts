import { FormGroup } from '@angular/forms';
import { TypeInput } from '../components/inputs/input-props.types';
import { IField } from '../models/field.model';
import { getFormControl } from './get-form-control.util';

export const createInputList = (fields: IField[], form: FormGroup): TypeInput[] => {
  return fields.map((field) => ({
    label: field.label,
    placeholder: field.placeholder,
    icon: field.icon,
    control: getFormControl(form, field.key),
    isTextarea: field.isTextarea,
    items: field.items,
  }));
};
