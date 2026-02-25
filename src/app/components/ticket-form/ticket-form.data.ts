import { Validators } from '@angular/forms';
import { EnumTicket, TICKET_PRIORITY, TICKET_STATUS } from '../../constants/ticket.constant';
import { IField } from '../../models/field.model';

export const TICKET_FORM_FIELDS = (isUpdate = false): IField[] => [
  {
    key: EnumTicket.TITLE,
    label: 'Название',
    placeholder: 'Введите название...',
    icon: '@tui.folder-pen',
    validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
  },
  {
    key: EnumTicket.DESCRIPTION,
    label: 'Описание',
    placeholder: 'Введите описание...',
    icon: '@tui.file-text',
    isTextarea: true,
    validators: [Validators.required, Validators.minLength(20), Validators.maxLength(1000)],
  },
  {
    key: EnumTicket.PRIORITY,
    label: 'Приоритет',
    icon: '@tui.octagon-alert',
    items: TICKET_PRIORITY,
    validators: [Validators.required],
  },
  ...(isUpdate
    ? [
        {
          key: EnumTicket.STATUS,
          label: 'Статус',
          icon: '@tui.chart-bar-big',
          items: TICKET_STATUS,
          validators: [Validators.required],
        },
      ]
    : []),
];
