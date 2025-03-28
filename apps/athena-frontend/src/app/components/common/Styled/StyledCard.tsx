import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1.5),
  width: '100%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  // boxShadow: 1,
  borderRadius: 10,
  flexDirection: 'column',
}));
