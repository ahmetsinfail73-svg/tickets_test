import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiAppearance, TuiButton, TuiDialogService, TuiExpand, TuiLoader } from '@taiga-ui/core';
import { TUI_CONFIRM, TuiBadge } from '@taiga-ui/kit';
import { Heading } from '../../components/heading/heading';
import { FileField } from '../../components/inputs/file-field/file-field';
import { IInputProps } from '../../components/inputs/input-props.types';
import { TicketForm } from '../../components/ticket-form/ticket-form';
import { File } from '../../constants/file.constant';
import { Path } from '../../constants/path.constant';
import {
  EnumTicket,
  TICKET_PRIORITY_APPEARANCE,
  TICKET_STATUS_APPEARANCE,
} from '../../constants/ticket.constant';
import { ITicket } from '../../models/ticket.model';
import { AppearancePipe } from '../../pipes/appearance.pipe';
import { NotificationService } from '../../services/notification.service';
import { RouterService } from '../../services/router.service';
import { TicketService } from '../../services/ticket.service';
import { useLoading } from '../../utils/use-loading.util';

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
    TuiLoader,
    FileField,
  ],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private routerService: RouterService,
    private notificationService: NotificationService,
  ) {}

  protected readonly expanded = signal(false);

  protected readonly priorityAppearance = TICKET_PRIORITY_APPEARANCE;

  protected readonly statusAppearance = TICKET_STATUS_APPEARANCE;

  private readonly dialog = inject(TuiDialogService);

  protected readonly isLoading = useLoading();

  protected readonly ticket = signal<ITicket | null>(null);

  protected readonly fileControl = new FormControl();

  protected fileProps!: IInputProps;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.fetchTicket(id);
  }

  protected onSuccess() {
    const ticket = this.ticket();

    if (ticket) {
      this.fetchTicket(ticket.id.toString());
    }
  }

  private fetchTicket(id: string) {
    this.isLoading.wrap(this.ticketService.getTicket(id)).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);

        this.fileProps = {
          key: EnumTicket.ATTACHMENTS,
          label: 'Файлы',
          control: this.fileControl,
          icon: '@tui.paperclip',
          mode: 'file',
          defaultValue: ticket.attachments,
          meta: {
            ticketId: ticket.id,
            maxCount: File.MAX_COUNT,
            accept: File.ACCEPT,
          },
        };
      },
      error: (error) => {
        this.routerService.redirect({
          path: Path.HOME,
        });
      },
    });
  }

  protected onDelete() {
    this.dialog
      .open<boolean>(TUI_CONFIRM, {
        size: 'm',
        label: 'Вы уверены, что хотите удалить эту заявку?',
        data: {
          content: 'Вся информация о заявке будет удалена и восстановлению не подлежит.',
          yes: 'Да',
          no: 'Отмена',
        },
      })
      .subscribe((result) => {
        if (result) {
          this.ticketService.deleteTicket(this.ticket()!.id).subscribe({
            next: (response) => {
              this.notificationService.success(response.message);

              this.routerService.redirect({
                path: Path.HOME,
              });
            },
          });
        }
      });
  }
}
