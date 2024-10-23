import {
  Card,
  CardContent,
  CardMedia,
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
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
  updateNewsletterInput,
  UpdateNewsletterItemInput,
} from '@athena/athena-common';

interface NewsletterItemMediaProps {
  editing: boolean;
  item: StoreNewsletterItem<NewsletterItemDetailsMedia>;
  onDeleteItem?: (id: number) => void;
}

export function NewsletterItemMediaCard(props: NewsletterItemMediaProps) {
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
        description: item.details.fileName ?? '',
        link: item.details.caption ?? '',
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
        <NewsletterItemMediaCardEditing register={register} />
      ) : (
        <NewsletterItemMediaCardDisplay details={item.details} />
      )}
    </Card>
  );
}

interface NewsletterItemMediaCardEditingProps {
  register: UseFormRegister<UpdateNewsletterItemInput>;
}

export function NewsletterItemMediaCardEditing(
  props: NewsletterItemMediaCardEditingProps
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

interface NewsletterItemMediaCardDisplayProps {
  details: NewsletterItemDetailsMedia;
}
export function NewsletterItemMediaCardDisplay(
  props: NewsletterItemMediaCardDisplayProps
) {
  const { details } = props;
  return (
    <Stack>
      <CardMedia component="img" image={`${details.fileName}`} />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {details.caption}
        </Typography>
      </CardContent>
    </Stack>
  );
}
