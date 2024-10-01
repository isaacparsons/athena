import { List } from '@mui/material';
import { Newsletter } from '../types';
import { useNavigate } from 'react-router-dom';
import { NewsletterCard } from './index';

interface NewslettersProps {
  newsletters: Newsletter[];
}
export function Newsletters(props: NewslettersProps) {
  const { newsletters } = props;
  const navigate = useNavigate();

  return (
    <List sx={{ width: '100%' }}>
      {newsletters.map((newsletter) => {
        return (
          <NewsletterCard
            key={newsletter.id}
            newsletter={newsletter}
            onClick={() => navigate(`/newsletters/${newsletter.id}`)}
          />
        );
      })}
    </List>
  );
}
