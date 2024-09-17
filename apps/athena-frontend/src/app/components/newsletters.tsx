import { List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Newsletters() {
  const [loading, setLoading] = useState(true);
  const [newsletters, setNewsletters] = useState<DBNewsletter[]>([]);

  const getNewsletters = async () => {
    const response = await api.newsletters.getMyNewsletters();
    setNewsletters(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getNewsletters();
  }, []);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {newsletters.map((newsletter) => {
        return <NewsletterItem newsletter={newsletter} />;
      })}
    </List>
  );
}
interface NewsletterItemProps {
  newsletter: DBNewsletter;
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
    //   <Divider variant="inset" component="li" />
  );
}
