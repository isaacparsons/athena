import { Stack, Typography } from '@mui/material';
import { CustomDateRange } from '@athena/components';
import {
  NewsletterProperties as INewsletterProperties,
  updateNewsletter,
} from '@athena/common';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface NewsletterPropertiesProps {
  data: INewsletterProperties;
  editing: boolean;
}

export function Properties(props: NewsletterPropertiesProps) {
  const { data, editing } = props;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateNewsletter>({
    resolver: zodResolver(updateNewsletter),
    mode: 'onSubmit',
    defaultValues: {
      properties: {
        name: '',
        dateRange: {
          start: new Date().toISOString(),
          end: null,
        },
      },
    },
  });

  return (
    <Stack spacing={1}>
      <Typography variant="h4">{data.name}</Typography>
      <CustomDateRange value={data.dateRange} editing={editing} />
    </Stack>
  );
}
