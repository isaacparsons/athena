import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNotifications } from '@toolpad/core';

interface AddItemTemplateDialog {
  open: boolean;
  handleClose: () => void;
}

export function AddItemTemplateDialog(props: AddItemTemplateDialog) {
  const { open, handleClose } = props;

  const notifications = useNotifications();

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogTitle>Add Template</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {/* <Button
          type="submit"
          onClick={handleUploadFiles}
          disabled={Object.keys(items).length === 0 || uploading}
        >
          {uploading ? <CircularProgress /> : 'Upload'}
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
