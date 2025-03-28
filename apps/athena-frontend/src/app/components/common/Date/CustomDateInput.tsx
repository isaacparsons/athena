import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { StyledDialog } from '@athena/components';

interface CustomDateInputProps {
  open: boolean;
  date?: string | null;
  onClose: () => void;
  onSave: (date: string | null) => void;
}

export function CustomDateInput({
  date,
  onSave,
  onClose,
  open,
}: CustomDateInputProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(date));

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setValue(newValue);
  };

  const handleUpdateDate = () => {
    onSave(value?.toISOString() ?? null);
  };

  return (
    <StyledDialog open={open}>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={dayjs(value)} onChange={handleDateChange} />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdateDate}>Save</Button>
      </DialogActions>
    </StyledDialog>
  );
}
