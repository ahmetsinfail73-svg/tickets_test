import { FormGroup } from '@angular/forms';

export const transformForm = <T = Record<string, string>>(form: FormGroup) => {
  const values: any = {};

  Object.keys(form.controls).forEach((key) => {
    const controlValue = form.get(key)?.value;

    values[key] =
      typeof controlValue === 'object' && controlValue !== null ? controlValue.value : controlValue;
  });

  return values as T;
};
