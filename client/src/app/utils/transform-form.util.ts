import { FormGroup } from '@angular/forms';

export const transformForm = <T = Record<string, string>>(form: FormGroup) => {
  const values: Record<string, any> = {};

  Object.keys(form.controls).forEach((key) => {
    const controlValue = form.get(key)?.value;

    values[key] =
      controlValue && typeof controlValue === 'object' ? controlValue.value : controlValue;
  });

  return values as T;
};
