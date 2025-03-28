import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserNewsletters } from '../pages/Newsletters/UserNewsletters';

const meta: Meta<typeof UserNewsletters> = {
  component: UserNewsletters,
  title: 'UserNewsletters',
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
type Story = StoryObj<typeof UserNewsletters>;

const user = {
  id: 1,
  email: 'user1@email.com',
  firstName: 'user',
  lastName: 'one',
};

export const Primary = {
  args: {
    data: [
      {
        id: 1,
        meta: {
          creator: user,
          modifier: null,
          created: '2025-01-24T16:42:32.271Z',
          modified: null,
        },
        properties: {
          name: 'newsletter 1',
          dateRange: {
            start: '2025-01-01T00:00:00.000Z',
          },
        },
        owner: user,
      },
      {
        id: 2,
        meta: {
          creator: user,
          modifier: null,
          created: '2025-02-24T16:42:32.271Z',
          modified: null,
        },
        properties: {
          name: 'newsletter 2',
          dateRange: {
            start: '2025-03-02T00:00:00.000Z',
          },
        },
        owner: user,
      },
      {
        id: 3,
        meta: {
          creator: user,
          modifier: null,
          created: '2025-03-24T16:42:32.271Z',
          modified: null,
        },
        properties: {
          name: 'newsletter 3',
          dateRange: {
            start: '2025-03-03T00:00:00.000Z',
          },
        },
        owner: user,
      },
    ],
  },
};
