import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiBadge, TuiLineClamp } from '@taiga-ui/kit';
import {
  TICKET_PRIORITY_APPEARANCE,
  TICKET_STATUS_APPEARANCE,
} from '../../../constants/ticket.constant';
import { AppearancePipe } from '../../../pipes/appearance.pipe';

@Component({
  selector: 'app-tickets-list',
  imports: [RouterLink, DatePipe, TuiBadge, UpperCasePipe, TuiLineClamp, AppearancePipe],
  templateUrl: './tickets-list.html',
  styleUrl: './tickets-list.css',
})
export class TicketsList {
  protected readonly priorityAppearance = TICKET_PRIORITY_APPEARANCE;

  protected readonly statusAppearance = TICKET_STATUS_APPEARANCE;

  protected ticket = {
    id: 1,
    title: 'Не работает VPN на удаленном рабочем месте',
    description:
      'Подробности инцидента: пользователи фиксируют нестабильную работу. Нужен анализ и отчет.',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2026-02-22T17:31:15.676Z',
  };
}
