import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  paddingRight: theme.spacing(1),
  width: '100%',
}));
