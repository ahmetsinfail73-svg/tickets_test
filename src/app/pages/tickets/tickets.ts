import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { Heading } from '../../components/heading/heading';
import { TicketsFilters } from './tickets-filters/tickets-filters';
import { TicketsList } from './tickets-list/tickets-list';
import { TicketsPagination } from './tickets-pagination/tickets-pagination';

@Component({
  selector: 'app-tickets',
  imports: [TuiButton, RouterLink, TicketsFilters, TicketsList, TicketsPagination, Heading],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {}
