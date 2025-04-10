import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledCard = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1.5),
  width: '100%',
  backgroundColor: 'white', //theme.palette.primary.light,
  display: 'flex',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.10)',
  flexDirection: 'column',
}));
