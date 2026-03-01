import { Component, Input as Inp } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { Path } from '../../constants/path.constant';
import { IField } from '../../models/field.model';
import { ITicket } from '../../models/ticket.model';
import { NotificationService } from '../../services/notification.service';
import { RouterService } from '../../services/router.service';
import { TicketService } from '../../services/ticket.service';
import { createFormGroup } from '../../utils/create-form.util';
import { createInputList } from '../../utils/create-input-list.util';
import { useLoading } from '../../utils/use-loading.util';
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
  constructor(
    private ticketService: TicketService,
    private notificationService: NotificationService,
    private routerService: RouterService,
  ) {}

  @Inp() ticket?: ITicket;

  @Inp() isUpdate = false;

  @Inp() onSuccess?: (response: any) => void;

  protected fields: IField[] = [];

  protected form!: FormGroup;

  protected inputs: TypeInput[] = [];

  protected readonly isLoading = useLoading();

  ngOnInit() {
    this.fields = TICKET_FORM_FIELDS(this.ticket);

    this.form = createFormGroup(this.fields);

    this.inputs = createInputList(this.fields, this.form);

    if (this.ticket) {
      this.form.patchValue(this.ticket);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading
        .wrap(
          this.isUpdate
            ? this.ticketService.updateTicket({
                ...this.form.value,
                id: this.ticket!.id,
              })
            : this.ticketService.createTicket(this.form.value),
        )
        .subscribe({
          next: (response) => {
            this.notificationService.success(response.message);

            if (this.isUpdate) {
              if (this.onSuccess) {
                this.onSuccess(response);
              }
            } else {
              this.form.reset();

              this.routerService.redirect({
                path: Path.HOME,
              });

              if (this.onSuccess) {
                this.onSuccess(response);
              }
            }
          },
          error: (error) => {
            const errors = error?.error || {};

            Object.entries(errors).forEach(([key, message]) => {
              const control = this.form.get(key);

              if (control) {
                control.setErrors({ serverError: message });
              }
            });
          },
        });
    } else {
      this.notificationService.error('Пожалуйста, заполните необходимые поля');
    }
  }
}
