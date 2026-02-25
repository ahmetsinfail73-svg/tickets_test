import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { IField } from '../models/field.model';

export const setParamsValueForm = (form: FormGroup, fields: IField[], params: Params) => {
  const obj: Record<string, any> = {};

  fields.forEach((field) => {
    const param = params[field.key];

    if (param) {
      if (field.items) {
        const item = field.items.find((item) => item.value === param);

        if (item) {
          obj[field.key] = item.value;
        }
      } else {
        obj[field.key] = param;
      }
    }
  });

  form.patchValue(obj);
};
