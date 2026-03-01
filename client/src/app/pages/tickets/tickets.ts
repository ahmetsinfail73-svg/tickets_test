import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { Heading } from '../../components/heading/heading';
import { Path } from '../../constants/path.constant';
import { IPaginationMeta } from '../../models/pagination.model';
import { ITicket } from '../../models/ticket.model';
import { RouterService } from '../../services/router.service';
import { TicketService } from '../../services/ticket.service';
import { useLoading } from '../../utils/use-loading.util';
import { TicketsFilters } from './tickets-filters/tickets-filters';
import { TicketsList } from './tickets-list/tickets-list';
import { TicketsPagination } from './tickets-pagination/tickets-pagination';

@Component({
  selector: 'app-tickets',
  imports: [
    TuiButton,
    RouterLink,
    TicketsFilters,
    TicketsList,
    TicketsPagination,
    Heading,
    TuiLoader,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {
  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private routerService: RouterService,
  ) {}

  protected readonly tickets = signal<ITicket[]>([]);

  protected readonly meta = signal<IPaginationMeta | null>(null);

  protected readonly createTicketPath = Path.CREATE_TICKET;

  protected readonly isLoading = useLoading();

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['page']) {
        const page = Number(params['page']);

        if (isNaN(page) || page < 1) {
          return this.routerService.redirect({
            queryParams: {
              page: 1,
            },
          });
        }
      }

      this.fetchTickets(params);
    });
  }

  private fetchTickets(params: Params) {
    const page = Number(params['page']);

    this.isLoading.wrap(this.ticketService.getTickets(params)).subscribe((response) => {
      const lastPage = response.meta.pages;

      if (lastPage && page > lastPage) {
        return this.routerService.redirect({
          queryParams: {
            page: lastPage,
          },
        });
      }

      this.tickets.set(response.tickets);

      this.meta.set(response.meta);
    });
  }
}
