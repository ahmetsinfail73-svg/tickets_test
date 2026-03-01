import { FormGroup } from '@angular/forms';
import { IField } from '../models/field.model';

export const resetForm = (form: FormGroup, fields: IField[]) => {
  const newForm: Record<string, any> = {};

  fields.forEach((field) => {
    newForm[field.key] = field.defaultValue || null;
  });

  form.reset(newForm);
};
