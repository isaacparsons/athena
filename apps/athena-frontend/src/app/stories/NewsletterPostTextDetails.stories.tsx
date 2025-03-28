import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserNewsletters } from '../pages/Newsletters/UserNewsletters';
import { NewsletterPostDetails } from '@athena/components';
import { NewsletterPostTypeName } from '@athena/common';

const NewsletterPostTextDetails = NewsletterPostDetails.Text;

const meta: Meta<typeof NewsletterPostTextDetails> = {
  component: NewsletterPostTextDetails,
  title: 'NewsletterPostTextDetails',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NewsletterPostTextDetails>;

export const Primary = {
  args: {
    data: {
      id: 1,
      type: NewsletterPostTypeName.Text,
      name: 'text post 1',
      newsletterPostId: 1,
      description: 'descriptionnnnn',
      link: 'linkkkkk',
    },
  },
};
