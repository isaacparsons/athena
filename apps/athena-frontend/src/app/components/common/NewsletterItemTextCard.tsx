import {
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreNewsletterItem } from '../../store';
import {
  NewsletterItemDetailsText,
  updateNewsletterInput,
  UpdateNewsletterItemInput,
} from '@athena/athena-common';

interface NewsletterItemTextProps {
  editing: boolean;
  item: StoreNewsletterItem<NewsletterItemDetailsText>;
  onDeleteItem?: (id: number) => void;
}

export function NewsletterItemTextCard(props: NewsletterItemTextProps) {
  const { editing, item } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdateNewsletterItemInput>({
    resolver: zodResolver(updateNewsletterInput),
    defaultValues: {
      details: {
        name: item.details.name,
        description: item.details.description ?? '',
        link: item.details.link ?? '',
      },
    },
  });

  const handleSave: SubmitHandler<UpdateNewsletterItemInput> = async (data) => {
    // console.log(data);
    // try {
    //   const newsletterId = await createNewsletter.mutateAsync(data);
    //   navigate(`/newsletters/${newsletterId}`);
    //   notifications.show('Newsletter created!', successNotificationOptions);
    //   onClose();
    //   reset();
    // } catch (error) {
    //   console.error(error);
    //   notifications.show(
    //     'Unable to create newsletter :(',
    //     errorNotificationOptions
    //   );
    // }
  };

  return (
    <Card>
      {editing ? (
        <Stack direction="row" justifyContent="flex-end">
          <IconButton
            aria-label="delete"
            onClick={() => console.log('removed')}
          >
            <CancelIcon />
          </IconButton>
        </Stack>
      ) : null}
      {editing ? (
        <NewsletterItemTextCardEditing register={register} />
      ) : (
        <NewsletterItemTextCardDisplay details={item.details} />
      )}
    </Card>
  );
}

interface NewsletterItemTextCardEditingProps {
  register: UseFormRegister<UpdateNewsletterItemInput>;
}

export function NewsletterItemTextCardEditing(
  props: NewsletterItemTextCardEditingProps
) {
  const { register } = props;
  return (
    <CardContent>
      <TextField
        required
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        {...register('details.name')}
      />
      <TextField
        required
        margin="dense"
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        {...register('details.description')}
      />
      <TextField
        required
        margin="dense"
        label="Link"
        type="text"
        fullWidth
        variant="standard"
        {...register('details.link')}
      />
    </CardContent>
  );
}

interface NewsletterItemTextCardDisplayProps {
  details: NewsletterItemDetailsText;
}
export function NewsletterItemTextCardDisplay(
  props: NewsletterItemTextCardDisplayProps
) {
  const { details } = props;
  return (
    <Stack>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {details.name}
        </Typography>
        {details.description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {details.description}
          </Typography>
        )}
        {details.link && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {details.link}
          </Typography>
        )}
      </CardContent>
    </Stack>
  );
}
