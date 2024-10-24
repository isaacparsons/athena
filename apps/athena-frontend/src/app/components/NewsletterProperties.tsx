import { NewsletterProperties as INewsletterProperties } from '@athena/athena-common';
import { Stack, Typography } from '@mui/material';
import { DateRange } from './common/DateRange';

interface NewsletterPropertiesProps {
  properties: INewsletterProperties;
}

export function NewsletterProperties(props: NewsletterPropertiesProps) {
  const { properties } = props;
  return (
    <Stack>
      <Typography>{properties.name}</Typography>
      <DateRange value={properties.dateRange} />
    </Stack>
  );
}
