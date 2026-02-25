import { EnumTicket, TICKET_PRIORITY, TICKET_STATUS } from '../../../constants/ticket.constant';
import { IField } from '../../../models/field.model';
import { ISelectItem } from '../../../models/select-item.model';
import { getDefaultSelectItem } from '../../../utils/get-default-select-item.util';

enum EnumSearchParam {
  SEARCH = 'search',
  SORT = 'sort',
}

enum EnumSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

const ALL: ISelectItem = {
  label: 'Все',
  value: 'all',
  isDefault: true,
};

const TICKET_FILTERS = {
  [EnumTicket.PRIORITY]: [ALL, ...TICKET_PRIORITY],
  [EnumTicket.STATUS]: [ALL, ...TICKET_STATUS],
  [EnumSearchParam.SORT]: [
    { label: 'Сначала новые', value: EnumSort.NEWEST, isDefault: true },
    { label: 'Сначала старые', value: EnumSort.OLDEST },
  ],
};

export const TICKET_FILTER_FIELDS: IField[] = [
  {
    key: EnumSearchParam.SEARCH,
    label: 'Поиск по содержимому заявки',
    placeholder: 'Поиск...',
    icon: '@tui.search',
    defaultValue: '',
  },
  {
    key: EnumTicket.STATUS,
    label: 'Статус',
    icon: '@tui.chart-bar-big',
    items: TICKET_FILTERS[EnumTicket.STATUS],
    defaultValue: getDefaultSelectItem(TICKET_FILTERS[EnumTicket.STATUS]),
  },
  {
    key: EnumTicket.PRIORITY,
    label: 'Приоритет',
    icon: '@tui.octagon-alert',
    items: TICKET_FILTERS[EnumTicket.PRIORITY],
    defaultValue: getDefaultSelectItem(TICKET_FILTERS[EnumTicket.PRIORITY]),
  },
  {
    key: EnumSearchParam.SORT,
    label: 'Сортировка',
    icon: '@tui.arrow-down-up',
    items: TICKET_FILTERS[EnumSearchParam.SORT],
    defaultValue: getDefaultSelectItem(TICKET_FILTERS[EnumSearchParam.SORT]),
  },
];
