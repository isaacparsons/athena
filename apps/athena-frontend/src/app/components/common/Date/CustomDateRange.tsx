import { DateRange, formatDate } from '@athena/common';
import { CalendarTodayIcon } from '@athena/icons';
import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface CustomDateRangeProps {
  editing?: boolean;
  onChange?: (dateRange: DateRange) => void;
  value: DateRange;
}

export function CustomDateRange(props: CustomDateRangeProps) {
  const { value, editing, onChange } = props;

  const handleChange = (dateRange: Partial<DateRange>) => {
    if (onChange) onChange({ ...value, ...dateRange });
  };

  if (editing)
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <DesktopDatePicker
            value={value.start === null ? null : dayjs(value.start)}
            onChange={(value) => {
              handleChange({ start: value?.toISOString() });
            }}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => handleChange({ start: null }),
              },
            }}
          />
          <DesktopDatePicker
            value={value.end === null ? null : dayjs(value.end)}
            onChange={(value) => {
              handleChange({ end: value?.toISOString() });
            }}
            slotProps={{
              field: { clearable: true, onClear: () => handleChange({ end: null }) },
            }}
          />
        </Stack>
      </LocalizationProvider>
    );

  return (
    <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
      <CalendarTodayIcon />
      <Typography>{`${value.start ? formatDate(value.start) : ''} ${
        value.end ? ' - ' + formatDate(value.end) : ''
      }`}</Typography>
    </Stack>
  );
}
