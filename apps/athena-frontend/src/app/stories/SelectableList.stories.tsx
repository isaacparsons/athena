import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { theme } from '@frontend/theme';
import { SelectableList } from '@frontend/components';

const meta: Meta<typeof SelectableList> = {
  component: SelectableList,
  title: 'SelectableList',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SelectableList>;

export const Primary = {
  args: {
    enabled: true,
    header: true,
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    selected: new Set([1]),
    setSelected: fn(),
    render: (value: any) => (
      <Box>
        <Typography>hi</Typography>
      </Box>
    ),
  },
};

export const MultiSelected = {
  args: {
    enabled: true,
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    selected: new Set([1, 4]),
    setSelected: fn(),
    render: (value: any) => (
      <Box>
        <Typography>hi</Typography>
      </Box>
    ),
  },
};

export const Disabled = {
  args: {
    enabled: false,
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    selected: new Set([1]),
    setSelected: fn(),
    render: (value: any) => (
      <Box>
        <Typography>hi</Typography>
      </Box>
    ),
  },
};

export const WithHeader = {
  args: {
    enabled: true,
    header: true,
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    selected: new Set([1]),
    setSelected: fn(),
    render: (value: any) => (
      <Box>
        <Typography>hi</Typography>
      </Box>
    ),
  },
};

export const NoneSelected = {
  args: {
    enabled: true,
    header: true,
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    selected: new Set([]),
    setSelected: fn(),
    render: (value: any) => (
      <Box>
        <Typography>hi</Typography>
      </Box>
    ),
  },
};

export const AllSelected = {
  args: {
    enabled: true,
    header: true,
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    selected: new Set([1, 2, 3, 4]),
    setSelected: fn(),
    render: (value: any) => (
      <Box>
        <Typography>hi</Typography>
      </Box>
    ),
  },
};
