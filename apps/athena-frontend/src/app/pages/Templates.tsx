import { useMemo } from 'react';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material'
import { CustomContainer } from '../components';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { mapToArray } from '../../util';
import { NewsletterItemTemplateBase } from '@athena/athena-common';

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
  templates: NewsletterItemTemplateBase[];
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
  template: NewsletterItemTemplateBase;
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
