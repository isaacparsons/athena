import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Chip,
  List,
  ListItem,
  Avatar,
  ImageList,
  ImageListItem,
  CircularProgress,
} from '@mui/material';

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
import { GetNewsletterResponse } from 'types/types';

export function Newsletter() {
  const { newsletterId } = useParams();
  const navigate = useNavigate();
  const user = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [newsletter, setNewsletter] = useState<GetNewsletterResponse | null>(
    null
  );

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
    return <CircularProgress />;
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
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {newsletter.items.map((item) => (
          <ImageListItem key={item.id}>
            <img src={`${item.link}`} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default Newsletter;
