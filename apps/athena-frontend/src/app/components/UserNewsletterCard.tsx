import {
  Card,
  CardActionArea,
  CardContent,
  ListItem,
  Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CustomHorizontalBox } from './index';
import { NewsletterBase, DateRange } from '@athena/athena-common';

function formatDate(date: string) {
  return new Date(date).toDateString();
}

function formatDateRange(dateRange: DateRange) {
  if (!dateRange.start) return null;
  const start = formatDate(dateRange.start);
  const end = dateRange.end ? formatDate(dateRange.end) : null;
  return `${start} - ${end}`;
}

interface UserNewsletterCardProps {
  newsletter: NewsletterBase;
  onClick: () => void;
}
export function UserNewsletterCard(props: UserNewsletterCardProps) {
  const { newsletter, onClick } = props;
  const { properties, meta } = newsletter;

  const formattedDateRange = properties.dateRange
    ? formatDateRange(properties.dateRange)
    : null;
  const formattedLastModifiedDate = meta.modified
    ? formatDate(meta.modified)
    : null;

  return (
    <ListItem>
      <Card sx={{ width: '100%' }}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {properties.name}
            </Typography>
            <CustomHorizontalBox>
              {formattedDateRange && <CalendarMonthIcon />}
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {formattedDateRange}
              </Typography>
            </CustomHorizontalBox>
            {formattedLastModifiedDate && (
              <CustomHorizontalBox sx={{ justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">{`last modified `}</Typography>
                <Typography variant="subtitle2">
                  {formattedLastModifiedDate}
                </Typography>
              </CustomHorizontalBox>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}
