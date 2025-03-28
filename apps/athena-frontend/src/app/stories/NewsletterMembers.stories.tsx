import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { NewsletterMembers } from '../pages';

const meta: Meta<typeof NewsletterMembers> = {
  component: NewsletterMembers,
  title: 'NewsletterMembers',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NewsletterMembers>;

export const Primary = {
  args: {
    data: [
      {
        id: 1,
        email: 'user1@email.com',
        firstName: 'user',
        lastName: 'one',
      },
      {
        id: 2,
        email: 'user2@email.com',
        firstName: 'user',
        lastName: 'two',
      },
    ],
  },
};
