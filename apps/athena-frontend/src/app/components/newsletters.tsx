import { List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Newsletter } from 'types/types';

interface NewslettersProps {
  newsletters: Newsletter[];
}

export function Newsletters(props: NewslettersProps) {
  const { newsletters } = props;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
    <ListItem alignItems="flex-start">
      <Button onClick={() => navigate(`/newsletters/${newsletter.id}`)}>
        <ListItemText primary={newsletter.name} />
      </Button>
    </ListItem>
  );
}
