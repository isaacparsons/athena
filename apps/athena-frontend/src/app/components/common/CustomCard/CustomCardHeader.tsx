import { Grid2 as Grid } from '@mui/material';
import React from 'react';

interface CustomCardHeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function CustomCardHeader({ left, right, center }: CustomCardHeaderProps) {
  return (
    <Grid container>
      {left && (
        <Grid display="flex" justifyContent="flex-start" size={2}>
          {left}
        </Grid>
      )}
      <Grid size="grow">{center}</Grid>
      {right && (
        <Grid display="flex" justifyContent="flex-end" size={2}>
          {right}
        </Grid>
      )}
    </Grid>
  );
}
