import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@frontend/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserTemplates } from '../pages';
import { createMockTemplateBase } from '../../util/test-data';

const meta: Meta<typeof UserTemplates> = {
  component: UserTemplates,
  title: 'UserTemplates',
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
type Story = StoryObj<typeof UserTemplates>;

export const Primary = {
  args: {
    data: [createMockTemplateBase({ id: 1 }), createMockTemplateBase({ id: 2 })],
  },
};
