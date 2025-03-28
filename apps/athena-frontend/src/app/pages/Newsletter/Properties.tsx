import { Stack, Typography } from '@mui/material';
import { CustomDateRange } from '@athena/components';
import { NewsletterProperties as INewsletterProperties } from '@athena/common';

interface NewsletterPropertiesProps {
  data: INewsletterProperties;
}

export function Properties(props: NewsletterPropertiesProps) {
  const { data } = props;
  return (
    <Stack spacing={1}>
      <Typography variant="h4">{data.name}</Typography>
      <CustomDateRange value={data.dateRange} />
    </Stack>
  );
}
