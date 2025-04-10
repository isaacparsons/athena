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
import { CreateNewsletter, createNewsletterSchema } from '@athena/common';
import { CustomDateRange, StyledDialog } from '@frontend/components';
import { usePromiseWithNotification } from '@frontend/hooks';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@frontend/store';

interface CreateNewsletterDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateNewsletterDialog(props: CreateNewsletterDialogProps) {
  const { onClose, open } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const navigate = useNavigate();
  const { createNewsletter } = useStore(
    useShallow((state) => ({ createNewsletter: state.newsletters.create }))
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateNewsletter>({
    resolver: zodResolver(createNewsletterSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      dateRange: {
        start: new Date().toISOString(),
        end: null,
      },
    },
  });

  const handleSave: SubmitHandler<CreateNewsletter> = async (data) => {
    promiseWithNotifications.execute(createNewsletter(data), {
      successMsg: 'Newsletter created!',
      errorMsg: 'Unable to create newsletter :(',
      onSuccess: (newsletterId) => {
        navigate(`/newsletters/${newsletterId}`);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Create Newsletter</DialogTitle>
      <DialogContent>
        <TextField
          {...register('name')}
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          helperText={errors.name?.message}
          error={Boolean(errors.name)}
        />
        <Controller
          control={control}
          name="dateRange"
          render={({ field: { onChange, value } }) => (
            <CustomDateRange value={value} editing={true} onChange={onChange} />
          )}
        />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider> */}
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
