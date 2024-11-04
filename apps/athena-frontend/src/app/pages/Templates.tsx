import { useMemo } from 'react';
import { Typography } from '@mui/material'
import { CustomCard, CustomContainer, CustomList, CustomListItem } from '../components';
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
    <CustomList>
      {templates.map((template) => (
        <CustomListItem id={template.id}>
          <UserTemplateCard template={template} />
        </CustomListItem>
      ))}
    </CustomList>
  );
}

interface UserTemplatesCardProps {
  template: NewsletterItemTemplateBase;
}

export function UserTemplateCard({ template }: UserTemplatesCardProps) {
  return (
    <CustomCard>
      <Typography sx={{ color: 'primary.main' }}>{template.name}</Typography>
    </CustomCard>
  );
}
