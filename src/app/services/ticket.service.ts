import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environmets/environmets';
import { ICreateTicketDto, ITicketsResponse, IUpdateTicketDto } from '../models/ticket.model';

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
    return this.http.get<ITicketsResponse>(this.baseUrl, { params: { id } });
  }

  createTicket(data: ICreateTicketDto) {
    return this.http.post(this.baseUrl, data);
  }

  updateTicket(data: IUpdateTicketDto) {
    return this.http.put(this.baseUrl, data);
  }

  deleteTicket(id: string) {
    return this.http.delete(this.baseUrl, {
      body: { id },
    });
  }
}
