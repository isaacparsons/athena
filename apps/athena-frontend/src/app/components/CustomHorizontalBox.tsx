import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface CustomHorizontalBoxProps {
  children: ReactNode;
  sx?: any;
}

export function CustomHorizontalBox(props: CustomHorizontalBoxProps) {
  const { children, sx } = props;
  return (
    <Box display="flex" flexDirection="row" alignItems="center" sx={sx}>
      {children}
    </Box>
  );
}
