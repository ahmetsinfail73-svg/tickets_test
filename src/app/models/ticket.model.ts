export interface ITicket {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  priority: EnumPRIORITY;
  status: EnumSTATUS;
}

export enum EnumPRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum EnumSTATUS {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}
