import { Component, Input as Inp } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { IField } from '../../models/field.model';
import { createFormGroup } from '../../utils/create-form.util';
import { createInputList } from '../../utils/create-input-list.util';
import { Input } from '../inputs/input';
import { TypeInput } from '../inputs/input-props.types';
import { TICKET_FORM_FIELDS } from './ticket-form.data';

@Component({
  selector: 'app-ticket-form',
  imports: [Input, ReactiveFormsModule, TuiButton],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
})
export class TicketForm {
  @Inp() defaultValues?: Record<string, any>;

  @Inp() isUpdate = false;

  protected fields: IField[] = [];

  protected form!: FormGroup;

  protected inputs: TypeInput[] = [];

  ngOnInit() {
    this.fields = TICKET_FORM_FIELDS(this.isUpdate);

    this.form = createFormGroup(this.fields);

    this.inputs = createInputList(this.fields, this.form);

    if (this.defaultValues) {
      this.form.patchValue(this.defaultValues);
    }
  }
}
