import {
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Newsletter } from 'types/types';

interface NewslettersProps {
  newsletters: Newsletter[];
}

export function Newsletters(props: NewslettersProps) {
  const { newsletters } = props;
  return (
    <List sx={{ width: '100%' }}>
      {newsletters.map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} />;
      })}
    </List>
  );
}

interface NewsletterItemProps {
  newsletter: Newsletter;
}

function NewsletterItem(props: NewsletterItemProps) {
  const { newsletter } = props;
  const navigate = useNavigate();
  return (
    <ListItem
      component={() => (
        <Card>
          <CardActionArea
            onClick={() => navigate(`/newsletters/${newsletter.id}`)}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {newsletter.name}
              </Typography>
              {newsletter.startDate && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {newsletter.startDate.toDateString()}
                </Typography>
              )}

              {newsletter.endDate && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {newsletter.endDate.toDateString()}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    ></ListItem>
  );
}
