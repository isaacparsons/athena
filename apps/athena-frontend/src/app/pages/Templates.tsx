import { useShallow } from 'zustand/react/shallow';
import { CustomContainer } from '../components/common/CustomContainer';
import { useStore } from '../store';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material';
import { useMemo } from 'react';

export function Templates() {
  const { loading, newsletterItemTemplates } = useStore(
    useShallow((state) => ({
      newsletterItemTemplates: state.newsletterItemTemplates.data,
      loading: state.newsletterItemTemplates.loading,
    }))
  );

  const templates = useMemo(() => {
    return Object.keys(newsletterItemTemplates).map(
      (key) => newsletterItemTemplates[Number(key)]
    );
  }, [newsletterItemTemplates]);

  return (
    <CustomContainer>
      <List>
        {templates.map((template) => (
          <ListItem>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography>{template.name}</Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </CustomContainer>
  );
}
