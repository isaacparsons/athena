import { DateRange as IDateRange, formatDate } from '@athena/common';
import { CalendarTodayIcon } from '@athena/icons';
import { Stack, Typography } from '@mui/material';

interface CustomDateRangeProps {
  value: IDateRange | null;
}

export function CustomDateRange(props: CustomDateRangeProps) {
  const { value } = props;
  if (!value || !value.start) return null;

  return (
    <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
      <CalendarTodayIcon />
      <Typography>{`${formatDate(value.start)} ${
        value.end && ' - ' + formatDate(value.end)
      }`}</Typography>
    </Stack>
  );
}
