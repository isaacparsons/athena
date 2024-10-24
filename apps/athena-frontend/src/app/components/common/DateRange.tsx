import { DateRange as IDateRange } from '@athena/athena-common';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Stack } from '@mui/material';

interface DateRangeProps {
  value: IDateRange | null;
}

export function DateRange(props: DateRangeProps) {
  const { value } = props;
  if (!value || !value.start) return null;

  return (
    <Stack direction="row">
      <CalendarTodayIcon />
      {value.start}
      {value.end && `- ${value.end}`}
    </Stack>
  );
}
