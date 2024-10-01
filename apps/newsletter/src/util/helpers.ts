export const parseDateRange = (
  startDate: string | null,
  endDate: string | null
) => {
  if (endDate && !startDate) {
    throw new Error('must have a start date date range specified');
  }
  return startDate
    ? {
        start: startDate,
        end: endDate,
      }
    : null;
};

export function removeUndefinedProperties(obj: object) {
  return Object.entries(obj)
    .filter(([key, value]) => value)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}
