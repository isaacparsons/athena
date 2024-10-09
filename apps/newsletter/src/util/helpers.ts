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
