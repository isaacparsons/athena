import { ButtonBase, Stack, Typography } from '@mui/material';
import { CalendarTodayIcon, EditIcon } from '@frontend/icons';
import { CustomDateInput } from '@frontend/components';
import { useState } from 'react';
import { formatDate } from '@athena/common';

interface CustomDateProps {
  value?: string | null;
  onChange?: (date: string | null) => void;
  editing: boolean;
}

const defaultProps = {
  editing: false,
};

export function CustomDate({ value, onChange, editing }: CustomDateProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleDatePickerClose = () => setDatePickerOpen(false);
  const handleDatePickerOpen = () => setDatePickerOpen(true);

  const handleSave = (date: string | null) => {
    if (onChange) onChange(date);
    handleDatePickerClose();
  };

  if (!editing && value?.length === 0) return null;
  return (
    <>
      <CustomDateInput
        open={editing && datePickerOpen}
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
          {editing ? (
            <EditIcon sx={{ color: 'white' }} />
          ) : (
            <CalendarTodayIcon sx={{ color: 'white' }} />
          )}
        </Stack>
      </ButtonBase>
    </>
  );
}

CustomDate.defaultProps = defaultProps;
