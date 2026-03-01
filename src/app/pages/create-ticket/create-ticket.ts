import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Heading } from '../../components/heading/heading';
import { TicketForm } from '../../components/ticket-form/ticket-form';
import { Path } from '../../constants/path.constant';
import { ICreateTicketResponse } from '../../models/ticket.model';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-create-ticket',
  imports: [Heading, ReactiveFormsModule, TicketForm],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {
  constructor(private routerService: RouterService) {}

  protected onSuccess(response: ICreateTicketResponse) {
    this.routerService.redirect({
      path: Path.TICKET(response.id),
    });
  }
}
