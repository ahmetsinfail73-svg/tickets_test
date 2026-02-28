import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk/classes';

export const maxCountFilesValidator = (maxCount: number): ValidatorFn => {
  return ({ value }: AbstractControl) =>
    value && value?.length > maxCount
      ? {
          maxCount: new TuiValidationError(`Максимальное количество файлов - ${maxCount}`),
        }
      : null;
};
