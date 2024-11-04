import {
  Stack,
  Typography,
} from '@mui/material';
import { NewsletterBase } from '@athena/athena-common';
import { formatDate, formatDateRange } from '../../util';
import { ArrowForwardIcon, CalendarMonthIcon } from '../icons';
import { CustomCard, CustomCardFooter, CustomIconButton } from './common';

interface UserNewsletterCardProps {
  newsletter: NewsletterBase;
  onClick: () => void;
}
export function UserNewsletterCard(props: UserNewsletterCardProps) {
  const { newsletter, onClick } = props;
  const { properties, meta } = newsletter;

  const formattedDateRange = properties.dateRange
    ? formatDateRange(properties.dateRange)
    : '';
  const formattedLastModifiedDate = meta.modified
    ? formatDate(meta.modified)
    : '';

  return (
    <CustomCard onClick={onClick}>
      <Stack direction={'column'} sx={{ alignItems: 'flex-start' }}>
        <Typography sx={{ color: "primary.main", fontSize: 25 }}>
          {properties.name}
        </Typography>
        <Stack direction="row">
          {formattedDateRange && <CalendarMonthIcon sx={{ color: "primary.main" }} />}
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            {formattedDateRange}
          </Typography>
        </Stack>
        {formattedLastModifiedDate && (
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">{`last modified `}</Typography>
            <Typography variant="subtitle2">
              {formattedLastModifiedDate}
            </Typography>
          </Stack>
        )}
      </Stack>
      <CustomCardFooter right={
        <CustomIconButton
          onClick={onClick}
          icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />} />
    </CustomCard>
  );
}
