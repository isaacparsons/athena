import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@frontend/theme';
import { NewsletterPostDetails } from '@frontend/components';
import { MediaFormat, NewsletterPostTypeName } from '@athena/common';

const NewsletterPostMediaDetails = NewsletterPostDetails.Media;

const meta: Meta<typeof NewsletterPostMediaDetails> = {
  component: NewsletterPostMediaDetails,
  title: 'NewsletterPostMediaDetails',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NewsletterPostMediaDetails>;

export const Image = {
  args: {
    data: {
      id: 1,
      type: NewsletterPostTypeName.Media,
      name: 'media post 1',
      newsletterPostId: 1,
      format: MediaFormat.Image,
      fileName: 'https://picsum.photos/1000/1000',
      caption: 'captionnnn',
    },
  },
};

export const Video = {
  args: {
    data: {
      id: 1,
      type: NewsletterPostTypeName.Media,
      name: 'media post 2',
      newsletterPostId: 1,
      format: MediaFormat.Video,
      fileName: 'https://www.youtube.com/watch?v=Ga5DH4iutmQ&ab_channel=DAZNCanada',
      caption: 'captionnnn',
    },
  },
};
