import {
  createCustomFab,
  CustomContainer,
  UserTemplates,
} from '@frontend/components';
import { AddIcon } from '@frontend/icons';
import { useStore } from '@frontend/store';
import { useShallow } from 'zustand/react/shallow';
import { CircularProgress } from '@mui/material';

const AddFab = createCustomFab(AddIcon);

export function Templates() {
  const { templates, loading } = useStore(
    useShallow((state) => ({
      templates: state.user.data?.templates ?? [],
      loading: state.user.loading,
    }))
  );
  console.log({
    templates,
  });

  // const [editing, setEditing] = useState(false);
  // const [createTemplateDialogOpen, setCreateTemplateDialogOpen] = useState(false);
  // const handleOpenCreateTemplateDialog = () => setCreateTemplateDialogOpen(true);
  // const handleCloseCreateTemplateDialog = () => setCreateTemplateDialogOpen(false);

  return (
    <CustomContainer>
      {loading ? <CircularProgress /> : <UserTemplates data={templates} />}
      {/* <AddFab onClick={handleOpenCreateTemplateDialog} /> */}
    </CustomContainer>
  );
}
