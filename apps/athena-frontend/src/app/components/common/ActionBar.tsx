import { AppBar, Stack } from '@mui/material';
import React from 'react';
import { APPBAR_HEIGHT } from '../../../theme';

interface ActionBarProps {
  title?: string;
  backBtn?: React.ReactElement | null;
  children?: React.ReactNode;
}

export const ActionBar = (props: ActionBarProps) => {
  const { title, backBtn, children } = props;
  return (
    <AppBar
      position="sticky"
      sx={{ height: APPBAR_HEIGHT, justifyContent: 'center', padding: 1 }}
    >
      <Stack direction="row" display="flex">
        <Stack direction="row" flex={1}>
          {backBtn ?? null}
        </Stack>
        <Stack direction="row" flex={3} justifyContent={'flex-end'}>
          {children ?? null}
        </Stack>
      </Stack>
    </AppBar>
  );
};
