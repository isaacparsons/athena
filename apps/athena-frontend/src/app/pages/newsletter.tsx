import { useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, List, ListItem, Avatar } from '@mui/material';

import { useAuthContext } from '../context/auth';
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { api } from '../../api';
import BackBtn from '../components/back-btn';
import { Newsletter as INewsletter } from 'types/types';

export function Newsletter() {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const user = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [newsletter, setNewsletter] = useState<INewsletter | null>(null);

  console.log(newsletter);

  const getNewsletter = async (id: number) => {
    const response = await api.newsletters.getNewsletterById(id);
    setNewsletter(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (newsletterId) {
      getNewsletter(parseInt(newsletterId));
    }
  }, [newsletterId]);

  if (!newsletter) {
    return null;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BackBtn />
      {/* <Box>
        {newsletter?.members.map(
          (user: {
            email:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          }) => {
            return <Chip label={user.email} variant="outlined" />;
          }
        )}
      </Box>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {newsletter.items.map((newsletterItem: any) => {
          return (
            <ListItem alignItems="flex-start">
              <Button onClick={() => navigate(`/newsletters/${newsletter.id}`)}>
        <ListItemText primary={newsletter.name} />
      </Button>
            </ListItem>
          );
        })}
      </List> */}
    </Box>
  );
}

export default Newsletter;
