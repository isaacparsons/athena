import { ButtonBase, Stack, Typography } from '@mui/material';
import { CalendarTodayIcon, EditIcon } from '@athena/icons';
import { CustomDateInput } from './CustomDateInput';
import { useState } from 'react';
import { formatDate } from '@athena/common';

interface CustomDateProps {
  value?: string;
  onChange?: (date: string | null) => void;
  readonly: boolean;
}

const defaultProps = {
  readonly: false,
};

export function CustomDate({ value, onChange, readonly }: CustomDateProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleDatePickerClose = () => setDatePickerOpen(false);
  const handleDatePickerOpen = () => setDatePickerOpen(true);

  const handleSave = (date: string | null) => {
    if (onChange) onChange(date);
    handleDatePickerClose();
  };

  return (
    <>
      <CustomDateInput
        open={!readonly && datePickerOpen}
        date={value}
        onSave={handleSave}
        onClose={handleDatePickerClose}
      />
      <ButtonBase onClick={handleDatePickerOpen}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 1,
            pl: 2,
            pr: 2,
            borderRadius: 10,
            bgcolor: 'primary.main',
          }}
        >
          <Typography sx={{ color: 'white' }}>
            {formatDate(value ?? new Date().toISOString())}
          </Typography>
          {readonly ? (
            <CalendarTodayIcon sx={{ color: 'white' }} />
          ) : (
            <EditIcon sx={{ color: 'white' }} />
          )}
        </Stack>
      </ButtonBase>
    </>
  );
}

CustomDate.defaultProps = defaultProps;
