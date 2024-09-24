import { List, CircularProgress } from '@mui/material';
import { ReadNewsletters } from 'types/types';
import { useStateContext, useStateDispatchContext } from '../context/state';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapToArray } from '../../util/helpers';
import { useAPI } from '../context/api';
import NewsletterCard from './NewsletterCard';

export function Newsletters() {
  const api = useAPI();
  const state = useStateContext();
  const dispatch = useStateDispatchContext();
  const navigate = useNavigate();

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
