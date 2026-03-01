import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environmets';
import { ISuccessMessage } from '../models/success-message.model';
import {
  ICreateTicketDto,
  ICreateTicketResponse,
  ITicket,
  ITicketsResponse,
  IUpdateTicketDto,
} from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  baseUrl = `${environment.API_URL}/tickets`;

  constructor(private http: HttpClient) {}

  getTickets(params?: Record<string, string>) {
    return this.http.get<ITicketsResponse>(this.baseUrl, { params });
  }

  getTicket(id: string) {
    return this.http.get<ITicket>(`${this.baseUrl}/${id}`);
  }

  createTicket(data: ICreateTicketDto) {
    return this.http.post<ICreateTicketResponse>(this.baseUrl, data);
  }

  updateTicket(data: IUpdateTicketDto) {
    return this.http.put<ISuccessMessage>(this.baseUrl, data);
  }

  deleteTicket(id: number) {
    return this.http.delete<ISuccessMessage>(this.baseUrl, {
      body: { id },
    });
  }
}
