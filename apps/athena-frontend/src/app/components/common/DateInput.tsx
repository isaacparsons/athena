import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

interface DateInputProps {
  id: number;
  date: string | null | undefined;
  onChange: (date: string | null) => void;
}
export function DateInput(props: DateInputProps) {
  const { date, onChange } = props;

  const [value, setValue] = useState<Dayjs | null>(dayjs(date));

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setValue(newValue);
  };

  const handleUpdateDate = () => {
    onChange(value?.toISOString() ?? null);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value}
        onChange={handleDateChange}
        onAccept={handleUpdateDate}
      />
    </LocalizationProvider>
  );
}
