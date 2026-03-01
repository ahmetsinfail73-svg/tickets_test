export const getNullObject = (arr: { key: string }[]) => {
  const newObj: Record<string, null> = {};

  arr.forEach((item) => {
    newObj[item.key] = null;
  });

  return newObj;
};
