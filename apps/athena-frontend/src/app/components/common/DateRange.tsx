import { DateRange as IDateRange } from '@athena/athena-common';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Stack } from '@mui/material';
import { formatDate } from '../../../util/helpers';

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
