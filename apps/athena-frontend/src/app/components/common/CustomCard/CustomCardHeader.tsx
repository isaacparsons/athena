import { Grid2 as Grid } from '@mui/material';
import React from 'react';

interface CustomCardHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export function CustomCardHeader({ left, right, children }: CustomCardHeaderProps) {
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid size={1} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        {left}
      </Grid>
      <Grid
        size="grow"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {children}
      </Grid>
      <Grid size={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {right}
      </Grid>
    </Grid>
  );
}
