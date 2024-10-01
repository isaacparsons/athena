import {
  Card,
  CardActionArea,
  CardContent,
  ListItem,
  Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ReadUserNewsletter } from '../types';
import { useMemo } from 'react';
import { CustomHorizontalBox } from './index';

interface NewsletterCardProps {
  newsletter: ReadUserNewsletter;
  onClick: () => void;
}

export function NewsletterCard(props: NewsletterCardProps) {
  const { newsletter, onClick } = props;

  const formattedDate = useMemo(() => {
    if (!newsletter.startDate) return null;
    const start = new Date(newsletter.startDate).toDateString();
    const end = newsletter.endDate
      ? new Date(newsletter.endDate).toDateString()
      : null;
    return `${start} - ${end}`;
  }, [newsletter.startDate, newsletter.endDate]);

  const formattedLastModifiedDate = useMemo(() => {
    if (!newsletter.modified) return null;
    const date = new Date(newsletter.modified);
    return `${date.toDateString()}`;
  }, [newsletter.modified]);

  return (
    <ListItem>
      <Card sx={{ width: '100%' }}>
        <CardActionArea onClick={() => onClick()}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {newsletter.name}
            </Typography>
            <CustomHorizontalBox>
              {formattedDate && <CalendarMonthIcon />}
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {formattedDate}
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
