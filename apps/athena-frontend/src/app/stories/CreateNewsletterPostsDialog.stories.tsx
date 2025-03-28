import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { CreateNewsletterDialog } from '../pages/Newsletters';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateNewsletterPostsDialog } from '@athena/components';
import { NewsletterPostTypeName } from '@athena/common';

const meta: Meta<typeof CreateNewsletterPostsDialog> = {
  component: CreateNewsletterPostsDialog,
  title: 'CreateNewsletterPostsDialog',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Story />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof CreateNewsletterPostsDialog>;

const user = {
  id: 1,
  email: 'user1@email.com',
  firstName: 'user',
  lastName: 'one',
};

export const Primary = {
  args: {
    data: {
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
    },
    onClose: fn(),
  },
};
