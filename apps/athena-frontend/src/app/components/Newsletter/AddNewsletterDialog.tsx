import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {
  CreateNewsletter,
  createNewsletter as createNewsletterInput,
} from '@athena/common';
import { StyledDialog } from '@athena/components';
import { usePromiseWithNotification } from '@athena/hooks';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@athena/store';

interface AddNewsletterDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddNewsletterDialog(props: AddNewsletterDialogProps) {
  const { onClose, open } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const navigate = useNavigate();
  const { createNewsletter } = useStore(
    useShallow((state) => ({ createNewsletter: state.newsletters.upload }))
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateNewsletter>({
    resolver: zodResolver(createNewsletterInput),
    mode: 'onChange',
    defaultValues: {
      properties: {
        name: '',
        dateRange: {
          start: new Date().toISOString(),
          end: undefined,
        },
      },
    },
  });

  const handleSave: SubmitHandler<CreateNewsletter> = async (data) => {
    promiseWithNotifications.execute(createNewsletter(data), {
      successMsg: 'Newsletter created!',
      errorMsg: 'Unable to create newsletter :(',
      onSuccess: (newsletterId) => {
        navigate(`/newsletters/${newsletterId}`);
        onClose();
        reset();
      },
    });
  };

  return (
    <StyledDialog fullScreen open={open}>
      <DialogTitle>Add Newsletter</DialogTitle>
      <DialogContent>
        <TextField
          {...register('properties.name')}
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.properties?.name?.message}
          error={Boolean(errors.properties?.name)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Controller
              control={control}
              name="properties.dateRange.start"
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  value={dayjs(value)}
                  onChange={(value) => {
                    onChange(value?.toISOString());
                  }}
                  slotProps={{
                    field: { clearable: true, onClear: () => onChange(undefined) },
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="properties.dateRange.end"
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  value={value ? dayjs(value) : undefined}
                  onChange={(value) => {
                    onChange(value?.toISOString());
                  }}
                  slotProps={{
                    field: { clearable: true, onClear: () => onChange(undefined) },
                  }}
                />
              )}
            />
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleSubmit(handleSave)}
          disabled={Boolean(!isValid)}
        >
          {isSubmitting ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
