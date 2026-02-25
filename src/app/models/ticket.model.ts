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
