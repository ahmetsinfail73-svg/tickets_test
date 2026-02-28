import { Validators } from '@angular/forms';
import { EnumTicket, TICKET_PRIORITY, TICKET_STATUS } from '../../constants/ticket.constant';
import { IField } from '../../models/field.model';
import { ITicket } from '../../models/ticket.model';

export const TICKET_FORM_FIELDS = (ticket?: ITicket): IField[] => [
  {
    key: EnumTicket.TITLE,
    label: 'Название',
    placeholder: 'Введите название...',
    icon: '@tui.folder-pen',
    validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
  },
  {
    key: EnumTicket.DESCRIPTION,
    label: 'Описание',
    placeholder: 'Введите описание...',
    icon: '@tui.file-text',
    mode: 'textarea',
    validators: [Validators.required, Validators.minLength(20)],
  },
  {
    key: EnumTicket.PRIORITY,
    label: 'Приоритет',
    icon: '@tui.octagon-alert',
    items: TICKET_PRIORITY,
    mode: 'select',
    validators: [Validators.required],
  },
  ...(!!ticket
    ? ([
        {
          key: EnumTicket.STATUS,
          label: 'Статус',
          icon: '@tui.chart-bar-big',
          items: TICKET_STATUS,
          mode: 'select',
          validators: [Validators.required],
        },
      ] as IField[])
    : []),
];
