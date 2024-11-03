import {
  NewsletterItemDetailsMedia,
  NewsletterItemDetailsText,
} from '@athena/athena-common';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { StoreNewsletterItem } from '../../../store';
import { useNavigate } from 'react-router-dom';

interface NewsletterItemCardProps {
  item: StoreNewsletterItem;
}

export function NewsletterItemCard(props: NewsletterItemCardProps) {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <Card>
      <ButtonBase onClick={() => navigate(`items/${item.id}`)}>
        {item.details?.type === 'media' && (
          <NewsletterItemMediaCardDisplay
            details={item.details as NewsletterItemDetailsMedia}
          />
        )}
        {item.details?.type === 'text' && (
          <NewsletterItemTextCardDisplay
            details={item.details as NewsletterItemDetailsText}
          />
        )}
      </ButtonBase>
    </Card>
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
