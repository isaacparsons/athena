import {
  List,
  ListItem,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReadNewsletters } from 'types/types';
import { useStateContext, useStateDispatchContext } from '../context/state';
import { useEffect, useState } from 'react';
import { mapToArray } from '../../util/helpers';
import { useAPI } from '../context/api';

export function Newsletters() {
  const api = useAPI();
  const state = useStateContext();
  const dispatch = useStateDispatchContext();

  const [loading, setLoading] = useState(true);

  const getNewsletters = async () => {
    setLoading(true);
    const response = await api.read<ReadNewsletters>(`/newsletters`);
    dispatch({
      entityType: 'newsletters',
      action: 'fetched',
      payload: response ?? [],
    });
    setLoading(false);
  };
  useEffect(() => {
    getNewsletters();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ width: '100%' }}>
      {mapToArray(state.newsletters).map((newsletter) => {
        return <NewsletterItem key={newsletter.id} newsletter={newsletter} />;
      })}
    </List>
  );
}

interface NewsletterItemProps {
  newsletter: ReadNewsletters[number];
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
                  {newsletter.startDate}
                </Typography>
              )}

              {newsletter.endDate && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {newsletter.endDate}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    ></ListItem>
  );
}
