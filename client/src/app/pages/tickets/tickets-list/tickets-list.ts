import { Component, Input } from '@angular/core';
import { ITicket } from '../../../models/ticket.model';
import { TicketItem } from './ticket-item/ticket-item';

@Component({
  selector: 'app-tickets-list',
  imports: [TicketItem],
  templateUrl: './tickets-list.html',
  styleUrl: './tickets-list.css',
})
export class TicketsList {
  @Input() tickets: ITicket[] = [];
}
