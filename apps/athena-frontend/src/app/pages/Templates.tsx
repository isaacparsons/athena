import {
  createCustomFab,
  CustomContainer,
  UserTemplates,
} from '@frontend/components';
import { AddIcon } from '@frontend/icons';
import { CircularProgress } from '@mui/material';
import { useUser } from '@frontend/store';

const AddFab = createCustomFab(AddIcon);

export function Templates() {
  const { templates, loading } = useUser();

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
