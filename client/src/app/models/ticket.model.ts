import { IAttachment } from './attachment.model';
import { IPaginationMeta } from './pagination.model';
import { ISuccessMessage } from './success-message.model';

export interface ITicket {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  priority: EnumPriority;
  status: EnumStatus;
  attachments: IAttachment[];
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

export interface ICreateTicketResponse extends ISuccessMessage {
  id: number;
}
