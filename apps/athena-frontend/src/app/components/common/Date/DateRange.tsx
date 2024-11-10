import { DateRange as IDateRange, formatDate } from '@athena/common';
import { CalendarTodayIcon } from '@athena/icons';
import { Stack } from '@mui/material';

interface DateRangeProps {
  value: IDateRange | null;
}

export function DateRange(props: DateRangeProps) {
  const { value } = props;
  if (!value || !value.start) return null;

  return (
    <Stack direction="row" spacing={2}>
      <CalendarTodayIcon />
      {formatDate(value.start)}
      {value.end && ` - ${formatDate(value.end)}`}
    </Stack>
  );
}
