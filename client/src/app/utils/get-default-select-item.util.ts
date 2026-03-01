import { ISelectItem } from '../models/select-item.model';

export const getDefaultSelectItem = (items: ISelectItem[]) => {
  const defaultItem = items.find((item) => item?.isDefault);

  return defaultItem?.value || items[0]?.value;
};
