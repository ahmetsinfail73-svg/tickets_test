import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CreateTicket } from './pages/create-ticket/create-ticket';
import { Ticket } from './pages/ticket/ticket';
import { Tickets } from './pages/tickets/tickets';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Tickets,
      },
      {
        path: 'create',
        component: CreateTicket,
      },
      {
        path: 'tickets/:id',
        component: Ticket,
      },
    ],
  },
];
