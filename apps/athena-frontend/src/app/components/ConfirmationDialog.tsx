import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  loading: boolean;
  onCloseDialog: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { open, onCloseDialog, onConfirm, title, content, loading } = props;
  return (
    <Dialog
      open={open}
      onClose={() => onCloseDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCloseDialog()}>Cancel</Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
