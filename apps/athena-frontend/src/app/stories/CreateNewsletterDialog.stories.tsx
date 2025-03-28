import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { CreateNewsletterDialog } from '../pages/Newsletters';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const meta: Meta<typeof CreateNewsletterDialog> = {
  component: CreateNewsletterDialog,
  title: 'CreateNewsletterDialog',
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
type Story = StoryObj<typeof CreateNewsletterDialog>;

export const Primary = {
  args: {
    open: true,
    onClose: fn(),
  },
};
