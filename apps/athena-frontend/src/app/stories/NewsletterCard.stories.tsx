import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@frontend/theme';
import { NewsletterCard } from '@frontend/components';

const meta: Meta<typeof NewsletterCard> = {
  component: NewsletterCard,
  title: 'NewsletterCard',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NewsletterCard>;

export const Primary = {
  args: {
    data: {
      id: 1,
      meta: {
        creator: {
          id: 1,
          email: 'user1@email.com',
          firstName: 'user',
          lastName: 'one',
        },
        modifier: null,
        created: '2025-03-24T16:42:32.271Z',
        modified: null,
      },
      properties: {
        name: 'newsletter 1',
        dateRange: {
          start: '2025-03-01T00:00:00.000Z',
        },
      },
      owner: {
        id: 1,
        email: 'user1@email.com',
        firstName: 'user',
        lastName: 'one',
      },
    },
  },
};
