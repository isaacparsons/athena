import { Grid2 as Grid } from '@mui/material';
import React from 'react';

interface CustomCardFooterProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function CustomCardFooter({ left, center, right }: CustomCardFooterProps) {
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
