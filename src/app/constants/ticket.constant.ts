import { ISelectItem } from '../models/select-item.model';
import { EnumPriority, EnumStatus } from '../models/ticket.model';

export enum EnumTicket {
  STATUS = 'status',
  PRIORITY = 'priority',
  TITLE = 'title',
  DESCRIPTION = 'description',
}

export const TICKET_STATUS: ISelectItem[] = [
  { label: 'Открыта', value: EnumStatus.OPEN },
  { label: 'В работе', value: EnumStatus.IN_PROGRESS },
  { label: 'Закрыта', value: EnumStatus.CLOSED },
];

export const TICKET_PRIORITY: ISelectItem[] = [
  { label: 'Низкий', value: EnumPriority.LOW },
  { label: 'Средний', value: EnumPriority.MEDIUM },
  { label: 'Высокий', value: EnumPriority.HIGH },
];

export const TICKET_PRIORITY_APPEARANCE = {
  [EnumPriority.LOW]: 'neutral',
  [EnumPriority.MEDIUM]: 'warning',
  [EnumPriority.HIGH]: 'negative',
};

export const TICKET_STATUS_APPEARANCE = {
  [EnumStatus.OPEN]: 'primary',
  [EnumStatus.IN_PROGRESS]: 'positive',
  [EnumStatus.CLOSED]: 'neutral',
};
