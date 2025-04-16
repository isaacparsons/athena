import { CustomContainer, UserTemplates } from '@frontend/components';
import { CircularProgress } from '@mui/material';
import { useUser } from '@frontend/store';

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
