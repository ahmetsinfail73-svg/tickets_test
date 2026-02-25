import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Heading } from '../../components/heading/heading';
import { TicketForm } from '../../components/ticket-form/ticket-form';

@Component({
  selector: 'app-create-ticket',
  imports: [Heading, ReactiveFormsModule, TicketForm],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css',
})
export class CreateTicket {}
