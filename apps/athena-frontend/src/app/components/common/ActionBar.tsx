import React from 'react';

import { AppBar, Grid2 as Grid, Typography, } from '@mui/material';
import { APPBAR_HEIGHT } from '@athena/theme';

interface ActionBarProps {
  title?: string;
  backBtn?: React.ReactElement | null | undefined
  children?: React.ReactNode;
}

export const ActionBar = (props: ActionBarProps) => {
  const { title, backBtn, children } = props;
  return (
    <AppBar
      position="sticky"
      sx={{ height: APPBAR_HEIGHT, justifyContent: 'center', padding: 1 }}
    >
      <Grid
        container
        spacing={3}
        direction="row"
        sx={{ justifyContent: "center" }}
      >
        <Grid size={1} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {backBtn ?? null}
        </Grid>
        <Grid size="grow" sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Typography >
            {title}
          </Typography>
        </Grid>
        <Grid size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {children}
        </Grid>
      </Grid>
    </AppBar>
  );
};
