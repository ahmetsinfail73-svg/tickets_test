import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLabel, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { IInputProps } from '../input-props.types';

@Component({
  selector: 'app-textarea',
  imports: [TuiTextarea, TuiTitle, TuiLabel, ReactiveFormsModule, TuiTextfield],
  templateUrl: './textarea.html',
  styleUrl: '../input.css',
})
export class Textarea {
  @Input() props!: IInputProps;
}
