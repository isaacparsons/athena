import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@frontend/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { meta as mockMeta } from '../../util/test-data';
import { Template } from '../pages';
import { NewsletterPostTypeName, TemplateType } from '@athena/common';

const meta: Meta<typeof Template> = {
  component: Template,
  title: 'Template',
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
type Story = StoryObj<typeof Template>;

const templateNode1 = {
  id: 1,
  position: {
    parentId: null,
    nextId: null,
    prevId: null,
  },
  templateId: 1,
  data: {
    title: 'post 1',
    'details.type': NewsletterPostTypeName.Text,
    'details.name': 'post 1',
  },
  meta: mockMeta,
};

const template = {
  id: 1,
  type: TemplateType.NewsletterPost,
  name: 'test template',
  config: {},
  meta: mockMeta,
  members: [],
  nodes: [templateNode1],
};

export const Primary = {
  args: {
    template,
  },
};
