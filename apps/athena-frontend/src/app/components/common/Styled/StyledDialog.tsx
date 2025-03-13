import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.secondary.light,
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));
