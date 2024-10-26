import { useShallow } from 'zustand/react/shallow';
import { CustomContainer } from '../components/common/CustomContainer';
import { useStore } from '../store';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material';
import { useMemo } from 'react';
import { StoreNewsletterItemTemplate } from '../store/newsletter-item-templates';
import { mapToArray } from '../../util/helpers';

export function Templates() {
  const { loading, newsletterItemTemplates } = useStore(
    useShallow((state) => ({
      newsletterItemTemplates: state.newsletterItemTemplates.data,
      loading: state.newsletterItemTemplates.loading,
    }))
  );

  const templates = useMemo(
    () => mapToArray(newsletterItemTemplates),
    [newsletterItemTemplates]
  );

  return (
    <CustomContainer>
      <UserTemplatesList templates={templates} />
    </CustomContainer>
  );
}

interface UserTemplatesListProps {
  templates: StoreNewsletterItemTemplate[];
}

export function UserTemplatesList(props: UserTemplatesListProps) {
  const { templates } = props;

  return (
    <List>
      {templates.map((template) => (
        <ListItem key={template.id}>
          <UserTemplateCard template={template} />
        </ListItem>
      ))}
    </List>
  );
}

interface UserTemplatesCardProps {
  template: StoreNewsletterItemTemplate;
}

export function UserTemplateCard(props: UserTemplatesCardProps) {
  const { template } = props;

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography>{template.name}</Typography>
      </CardContent>
    </Card>
  );
}
