import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LocationDialog, LocationProvider } from '@frontend/components';
import { theme } from '@frontend/theme';
import { ThemeProvider } from '@mui/material';

const meta: Meta<typeof LocationDialog> = {
  component: LocationDialog,
  title: 'LocationDialog',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <LocationProvider>
          <Story />
        </LocationProvider>
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof LocationDialog>;

export const Primary = {
  args: {
    open: true,
  },
};
