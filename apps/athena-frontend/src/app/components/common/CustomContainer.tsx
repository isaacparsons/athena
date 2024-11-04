import React from 'react';

import { Container } from '@mui/material';

interface CustomContainerProps {
  children: React.ReactNode;
}

export function CustomContainer({ children }: CustomContainerProps) {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        padding: 2,
        bgcolor: 'secondary.light'
      }}
      maxWidth="md"
    >
      {children}
    </Container>
  );
}
