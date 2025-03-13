import {
  CustomContainer,
  CustomList,
  CustomListItem,
  UserTemplateCard,
} from '@athena/components';
import { useStore } from '@athena/store';
import { useShallow } from 'zustand/react/shallow';
import { NewsletterPostTemplateBase } from '@athena/common';

export function Templates() {
  const { loading, itemTemplates } = useStore(
    useShallow((state) => ({
      itemTemplates: state.user.data?.newsletterItemTemplates ?? [],
      loading: state.newsletterItemTemplates.loading,
    }))
  );

  return (
    <CustomContainer>
      <UserTemplatesList templates={itemTemplates} />
    </CustomContainer>
  );
}

interface UserTemplatesListProps {
  templates: NewsletterPostTemplateBase[];
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
