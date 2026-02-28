import { IPaginationMeta } from './pagination.model';

export interface ITicket {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  priority: EnumPriority;
  status: EnumStatus;
}

export enum EnumPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum EnumStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}

export interface ICreateTicketDto extends Pick<ITicket, 'description' | 'title' | 'priority'> {}

export interface IUpdateTicketDto extends Pick<
  ITicket,
  'description' | 'title' | 'priority' | 'status' | 'id'
> {}

export interface ITicketsResponse {
  tickets: ITicket[];
  meta: IPaginationMeta;
}
