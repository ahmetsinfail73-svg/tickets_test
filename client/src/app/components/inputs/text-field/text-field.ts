import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLabel, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { IInputProps } from '../input-props.types';

@Component({
  selector: 'app-text-field',
  imports: [TuiTextfield, TuiTitle, TuiLabel, ReactiveFormsModule],
  templateUrl: './text-field.html',
  styleUrl: '../input.css',
})
export class TextField {
  @Input() props!: IInputProps;
}
