import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLabel, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { ISelectProps } from '../input-props.types';

@Component({
  selector: 'app-select',
  imports: [TuiTextfield, TuiTitle, TuiLabel, ReactiveFormsModule, TuiDataListWrapper, TuiSelect],
  templateUrl: './select.html',
  styleUrl: '../input.css',
})
export class Select {
  @Input() props!: ISelectProps;

  protected get values() {
    return this.props.items.map((item) => item.value);
  }

  protected selectStringify = (value: string) => {
    const item = this.props.items.find((i) => i.value === value);

    return item ? item.label : value;
  };
}
