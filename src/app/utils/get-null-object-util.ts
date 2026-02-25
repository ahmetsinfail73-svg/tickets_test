export const getNullObject = (obj: Record<string, any>) => {
  const newObj: Record<string, null> = {};

  Object.keys(obj).forEach((key) => {
    newObj[key] = null;
  });

  return newObj;
};
