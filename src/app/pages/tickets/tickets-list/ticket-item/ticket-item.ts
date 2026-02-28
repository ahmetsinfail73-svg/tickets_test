import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiBadge, TuiLineClamp } from '@taiga-ui/kit';
import { Path } from '../../../../constants/path.constant';
import {
  TICKET_PRIORITY_APPEARANCE,
  TICKET_STATUS_APPEARANCE,
} from '../../../../constants/ticket.constant';
import { ITicket } from '../../../../models/ticket.model';
import { AppearancePipe } from '../../../../pipes/appearance.pipe';

@Component({
  selector: 'app-ticket-item',
  imports: [RouterLink, DatePipe, TuiBadge, UpperCasePipe, TuiLineClamp, AppearancePipe],
  templateUrl: './ticket-item.html',
  styleUrl: './ticket-item.css',
})
export class TicketItem {
  @Input() ticket!: ITicket;

  protected readonly priorityAppearance = TICKET_PRIORITY_APPEARANCE;

  protected readonly statusAppearance = TICKET_STATUS_APPEARANCE;

  protected readonly ticketPath = Path.TICKET;
}
