import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { trpc } from '../../trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateNewsletterInput,
  postNewsletterInput,
} from '@athena/athena-common';
import { useNavigate } from 'react-router-dom';
import { usePromiseWithNotification } from '../hooks/usePromiseWithNotification';

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
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateNewsletterInput>({
    resolver: zodResolver(postNewsletterInput),
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
          required
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          error={Boolean(errors.name)}
          //   helperText=
          {...register('name', { required: true })}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" flexDirection="row">
            <MobileDatePicker
              {...register('startDate')}
              onChange={(value) => {
                if (value && value.isValid())
                  setValue('startDate', value.toISOString());
              }}
            />
            <MobileDatePicker
              {...register('endDate')}
              onChange={(value) => {
                if (value && value.isValid())
                  setValue('endDate', value.toISOString());
              }}
            />
          </Box>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleSubmit(handleSave)}
          disabled={!isValid}
        >
          {isSubmitting ? <CircularProgress /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
