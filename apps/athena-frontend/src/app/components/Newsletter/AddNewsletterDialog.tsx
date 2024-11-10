import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CircularProgress,
  Dialog,
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
import { trpc } from '../../../trpc';
import {
  CreateNewsletterInput,
  postNewsletterInput,
} from '@athena/common';
import { usePromiseWithNotification } from '@athena/hooks';

interface AddNewsletterDialogProps {
  open: boolean;
  onClose: () => void;
}


export function AddNewsletterDialog(props: AddNewsletterDialogProps) {
  const { onClose, open } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const navigate = useNavigate();
  const createNewsletter = trpc.newsletters.post.useMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateNewsletterInput>({
    resolver: zodResolver(postNewsletterInput),
    mode: 'onChange',
    defaultValues: {
      name: '',
      startDate: new Date().toISOString(),
      endDate: undefined
    },
  });

  const handleSave: SubmitHandler<CreateNewsletterInput> = async (data) => {
    promiseWithNotifications.execute(createNewsletter.mutateAsync(data), {
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
    <Dialog fullScreen open={open}>
      <DialogTitle>Add Newsletter</DialogTitle>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  value={dayjs(value)}
                  onChange={(value) => { onChange(value?.toISOString()) }}
                  slotProps={{
                    field: { clearable: true, onClear: () => onChange(undefined) },
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  value={value ? dayjs(value) : undefined}
                  onChange={(value) => { onChange(value?.toISOString()) }}
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
    </Dialog>
  );
}
