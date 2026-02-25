import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TuiAppearance, TuiButton, TuiDialogService, TuiExpand } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiBadge } from '@taiga-ui/kit';
import { Heading } from '../../components/heading/heading';
import { TicketForm } from '../../components/ticket-form/ticket-form';
import {
  TICKET_PRIORITY_APPEARANCE,
  TICKET_STATUS_APPEARANCE,
} from '../../constants/ticket.constant';
import { ITicket } from '../../models/ticket.model';
import { AppearancePipe } from '../../pipes/appearance.pipe';

@Component({
  selector: 'app-ticket',
  imports: [
    UpperCasePipe,
    TuiBadge,
    DatePipe,
    Heading,
    TuiExpand,
    TicketForm,
    TuiAppearance,
    AppearancePipe,
    TuiButton,
  ],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  protected readonly expanded = signal(false);

  protected readonly priorityAppearance = TICKET_PRIORITY_APPEARANCE;

  protected readonly statusAppearance = TICKET_STATUS_APPEARANCE;

  private readonly dialog = inject(TuiDialogService);

  protected ticket = {
    id: 1,
    title: 'Не работает VPN на удаленном рабочем месте',
    description:
      'Подробности инцидента: пользователи фиксируют нестабильную работу. Нужен анализ и отчет.',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2026-02-22T17:31:15.676Z',
  } as ITicket;

  protected onDelete() {
    this.dialog
      .open(TUI_CONFIRM, {
        size: 'm',
        label: 'Вы уверены, что хотите удалить эту заявку?',
        data: {
          content: 'Вся информация о заявке будет удалена и восстановлению не подлежит.',
          yes: 'Да',
          no: 'Отмена',
        },
      })
      .subscribe(console.log);
  }
}
