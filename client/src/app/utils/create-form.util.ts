import { FormControl, FormGroup } from '@angular/forms';
import { IField } from '../models/field.model';

export const createFormGroup = (fields: IField[]) => {
  const controls: Record<string, FormControl> = {};

  fields.forEach((field) => {
    controls[field.key] = new FormControl(field.defaultValue || null, field.validators || []);
  });

  return new FormGroup(controls);
};
