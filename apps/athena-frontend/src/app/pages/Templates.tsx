import { useMemo } from 'react';
import { CustomContainer, CustomList, CustomListItem, UserTemplateCard } from '@athena/components';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterItemTemplateBase, mapToArray } from '@athena/common';

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

