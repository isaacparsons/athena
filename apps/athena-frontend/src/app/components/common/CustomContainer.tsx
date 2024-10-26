import { Container, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

interface CustomContainerProps {
  children: React.ReactNode;
}

export function CustomContainer(props: CustomContainerProps) {
  const { children } = props;
  const theme = useTheme();
  return (
    <Container
      sx={{
        minHeight: '100vh',
        padding: theme.spacing(2),
      }}
      maxWidth="md"
    >
      {children}
    </Container>
  );
}
