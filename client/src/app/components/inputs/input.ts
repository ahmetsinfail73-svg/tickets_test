import { AsyncPipe } from '@angular/common';
import { Component, Input as Inp } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe, tuiValidationErrorsProvider } from '@taiga-ui/kit';
import { FileField } from './file-field/file-field';
import { TypeInput } from './input-props.types';
import { Select } from './select/select';
import { TextField } from './text-field/text-field';
import { Textarea } from './textarea/textarea';

@Component({
  selector: 'app-input',
  imports: [
    TextField,
    Select,
    Textarea,
    TuiError,
    ReactiveFormsModule,
    TuiFieldErrorPipe,
    AsyncPipe,
    FileField,
  ],
  templateUrl: './input.html',
  providers: [
    tuiValidationErrorsProvider({
      required: 'Это поле обязательно',
      maxlength: ({ requiredLength }: { requiredLength: string }) =>
        `Максимальное количество символов — ${requiredLength}`,
      minlength: ({ requiredLength }: { requiredLength: string }) =>
        `Минимальное количество символов — ${requiredLength}`,
    }),
  ],
})
export class Input {
  @Inp() props!: TypeInput;
}
