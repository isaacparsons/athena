import {
  createCustomFab,
  CustomContainer,
  CustomList,
  CustomListItem,
} from '@athena/components';
import { AddIcon } from '@athena/icons';
import { useStore } from '@athena/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { UserTemplates } from './UserTemplates';
import { NewsletterPostsController } from '../../components/common/NewsletterPosts/NewsletterPostsController';

const AddFab = createCustomFab(AddIcon);

export function Templates() {
  //   const { loading, itemTemplates } = useStore(
  //     useShallow((state) => ({
  //       itemTemplates: state.user.data?.newsletterItemTemplates ?? [],
  //       loading: state.newsletterItemTemplates.loading,
  //     }))
  //   );

  const [editing, setEditing] = useState(false);
  const [createTemplateDialogOpen, setCreateTemplateDialogOpen] = useState(false);
  const handleOpenCreateTemplateDialog = () => setCreateTemplateDialogOpen(true);
  const handleCloseCreateTemplateDialog = () => setCreateTemplateDialogOpen(false);

  return (
    <CustomContainer>
      {/* {createTemplateDialogOpen && <NewsletterPostsController
          editing={editing}
          newsletterId={newsletter.id}
          existingPosts={posts}
          onSave={onSave}
        />} */}
      <UserTemplates data={[]} />
      <AddFab onClick={handleOpenCreateTemplateDialog} />
    </CustomContainer>
  );
}

function CreateTemplateDialog() {
  return;
}

// interface UserTemplatesListProps {
//   templates: NewsletterPostTemplateBase[];
// }

// export function UserTemplatesList(props: UserTemplatesListProps) {
//   const { templates } = props;

//   return (
//     <CustomList>
//       {templates.map((template) => (
//         <CustomListItem id={template.id}>
//           <UserTemplateCard template={template} />
//         </CustomListItem>
//       ))}
//     </CustomList>
//   );
// }
