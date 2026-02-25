import { FormControl, FormGroup } from '@angular/forms';

export const getFormControl = (form: FormGroup, name: string) => {
  return form.get(name) as FormControl;
};
