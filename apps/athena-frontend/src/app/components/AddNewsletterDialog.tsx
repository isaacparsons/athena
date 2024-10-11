import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DateRangePicker,
  DateRange,
  PickerChangeHandlerContext,
  DateRangeValidationError,
} from '@mui/x-date-pickers-pro';
import { ChangeEvent, useState } from 'react';
import dayjs from 'dayjs';

interface AddNewsletterDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddNewsletterDialog(props: AddNewsletterDialogProps) {
  const { open, onClose } = props;

  const [name, setName] = useState('');
  const [dateRange, setDateRange] = useState<
    DateRange<dayjs.Dayjs> | undefined
  >(undefined);
  const [saving, setSaving] = useState(false);

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleDateRange = (
    value: DateRange<dayjs.Dayjs>,
    context: PickerChangeHandlerContext<DateRangeValidationError>
  ) => {
    setDateRange(value);
  };
  const handleSave = async () => {
    setSaving(true);

    setSaving(false);
    onClose();
  };
  return (
    <Dialog fullScreen open={open}>
      <DialogTitle>Add Newsletter</DialogTitle>
      <DialogContent>
        <TextField
          // autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          //   onBlur={updateName}
          variant="standard"
          value={name}
          onChange={handleNameChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            calendars={1}
            value={dateRange}
            onChange={handleDateRange}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSave} disabled={name.length === 0}>
          {saving ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
