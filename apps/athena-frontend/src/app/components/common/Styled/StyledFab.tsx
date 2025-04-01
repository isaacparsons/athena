import { Fab } from '@mui/material';
import { styled } from '@mui/system';

export const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
  backgroundColor: theme.palette.primary.main,
}));
