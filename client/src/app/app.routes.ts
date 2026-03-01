import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CreateTicket } from './pages/create-ticket/create-ticket';
import { Ticket } from './pages/ticket/ticket';
import { Tickets } from './pages/tickets/tickets';

export const routes: Routes = [
  {
    path: 'tickets',
    component: Layout,
    children: [
      {
        path: '',
        component: Tickets,
        title: 'Тикеты',
      },
      {
        path: 'create',
        component: CreateTicket,
        title: 'Создание тикета',
      },
      {
        path: ':id',
        component: Ticket,
        title(route) {
          return `Тикет #${route.params['id']}`;
        },
      },
    ],
  },
  { path: '**', redirectTo: 'tickets' },
];
