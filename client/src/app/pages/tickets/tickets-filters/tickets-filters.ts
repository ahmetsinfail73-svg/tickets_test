import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { Input } from '../../../components/inputs/input';
import { TypeInput } from '../../../components/inputs/input-props.types';
import { RouterService } from '../../../services/router.service';
import { createFormGroup } from '../../../utils/create-form.util';
import { createInputList } from '../../../utils/create-input-list.util';
import { getNullObject } from '../../../utils/get-null-object-util';
import { resetForm } from '../../../utils/reset-form.util';
import { setParamsValueForm } from '../../../utils/set-params-value-form.util';
import { transformForm } from '../../../utils/transform-form.util';
import { TICKET_FILTER_FIELDS } from './ticket-filter.data';

@Component({
  selector: 'app-tickets-filters',
  imports: [TuiButton, TuiTextfield, TuiSelect, TuiDataListWrapper, ReactiveFormsModule, Input],
  templateUrl: './tickets-filters.html',
  styleUrl: './tickets-filters.css',
})
export class TicketsFilters {
  protected form = createFormGroup(TICKET_FILTER_FIELDS);

  protected readonly inputs: TypeInput[] = createInputList(TICKET_FILTER_FIELDS, this.form);

  constructor(
    private route: ActivatedRoute,
    private routerService: RouterService,
  ) {
    this.route.queryParams.subscribe((params) => {
      setParamsValueForm(this.form, TICKET_FILTER_FIELDS, params);
    });
  }

  protected applyFilters() {
    this.routerService.redirect({
      queryParams: transformForm(this.form),
    });
  }

  protected resetFilters() {
    resetForm(this.form, TICKET_FILTER_FIELDS);

    this.routerService.redirect({
      queryParams: getNullObject(TICKET_FILTER_FIELDS),
    });
  }
}
