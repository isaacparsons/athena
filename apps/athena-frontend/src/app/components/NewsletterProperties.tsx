import {
  NewsletterProperties as INewsletterProperties,
  DateRange as IDateRange,
} from '@athena/athena-common';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Stack, Typography } from '@mui/material';

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

interface DateRangeProps {
  value: IDateRange | null;
}

export function DateRange(props: DateRangeProps) {
  const { value } = props;
  if (!value || !value.start) return null;

  return (
    <Stack direction="row">
      <CalendarTodayIcon />
      {value.start}
      {value.end && `- ${value.end}`}
    </Stack>
  );
}
