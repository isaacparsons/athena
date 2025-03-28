import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { NewsletterProperties } from '../pages';

const meta: Meta<typeof NewsletterProperties> = {
  component: NewsletterProperties,
  title: 'NewsletterProperties',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NewsletterProperties>;

export const Primary = {
  args: {
    data: {
      name: 'newsletter 1',
      dateRange: {
        start: '2025-03-24T16:42:32.271Z',
        end: null,
      },
    },
  },
};
