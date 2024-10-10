import { List } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { UserNewsletterCard } from './index';
import { NewsletterBase } from '@athena/athena-common';

interface NewslettersProps {
  newsletters: NewsletterBase[];
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
