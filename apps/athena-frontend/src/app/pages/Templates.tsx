import { useShallow } from 'zustand/react/shallow';
import { CustomContainer } from '../components/common/CustomContainer';
import { useStore } from '../store';
import { List, ListItem, ListItemText } from '@mui/material';
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
            <ListItemText primary={template.name} />
          </ListItem>
        ))}
      </List>
    </CustomContainer>
  );
}
