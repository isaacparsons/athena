import { useNavigate } from 'react-router-dom';
import { SubmitHandler, Controller } from 'react-hook-form';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { CreateNewsletter } from '@athena/common';
import { CustomDateRange, StyledDialog } from '@frontend/components';
import {
  useCreateNewsletterForm,
  usePromiseWithNotification,
} from '@frontend/hooks';
import { useNewsletters } from '@frontend/store';

interface CreateNewsletterDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateNewsletterDialog(props: CreateNewsletterDialogProps) {
  const { onClose, open } = props;
  const promiseWithNotifications = usePromiseWithNotification();
  const navigate = useNavigate();
  const { create } = useNewsletters();
  const { control, handleSubmit, formState, reset } = useCreateNewsletterForm();
  const { errors, isValid, isSubmitting } = formState;

  const handleSave: SubmitHandler<CreateNewsletter> = async (data) => {
    promiseWithNotifications.execute(create(data), {
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
        <Controller
          control={control}
          name="dateRange"
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={value}
              onChange={onChange}
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
          )}
        />

        <Controller
          control={control}
          name="dateRange"
          render={({ field: { onChange, value } }) => (
            <CustomDateRange value={value} editing={true} onChange={onChange} />
          )}
        />
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
