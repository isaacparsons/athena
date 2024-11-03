import { UserNewsletterCard } from '../components';
import { List, } from '@mui/material'
import { StoreNewsletter } from '../store';
import { useNavigate } from 'react-router-dom';

interface NewslettersProps {
  newsletters: StoreNewsletter[];
}
export function UserNewsletters(props: NewslettersProps) {
  const { newsletters } = props;
  const navigate = useNavigate();

  return (
    <List sx={{ width: '100%' }}>
      {newsletters.map((newsletter) => {
        return (
          <UserNewsletterCard
            key={newsletter.id}
            newsletter={newsletter}
            onClick={() => navigate(`/newsletters/${newsletter.id}`)}
          />
        );
      })}
    </List>
  );
}
