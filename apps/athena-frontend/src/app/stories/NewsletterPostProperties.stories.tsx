import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@frontend/theme';
import { NewsletterPostProperties } from '@frontend/components';
import { NewsletterPostTypeName } from '@athena/common';

const meta: Meta<typeof NewsletterPostProperties> = {
  component: NewsletterPostProperties,
  title: 'NewsletterPostProperties',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NewsletterPostProperties>;

const user = {
  id: 1,
  email: 'user1@email.com',
  firstName: 'user',
  lastName: 'one',
};

const textPost = {
  id: 1,
  meta: {
    creator: user,
    modifier: null,
    created: '2025-03-24T16:42:32.271Z',
    modified: null,
  },
  newsletterId: 1,
  title: 'text post 1',
  date: null,
  details: {
    id: 1,
    type: NewsletterPostTypeName.Text,
    name: 'text post 1',
    newsletterPostId: 1,
    description: 'descriptionnnnn',
    link: 'linkkkkk',
  },
  position: {
    parentId: null,
    nextId: null,
    prevId: null,
  },
  location: null,
  children: [],
};

export const Primary = {
  args: {
    editing: false,
    data: textPost,
  },
};

export const Editing = {
  args: {
    editing: true,
    data: textPost,
  },
};
