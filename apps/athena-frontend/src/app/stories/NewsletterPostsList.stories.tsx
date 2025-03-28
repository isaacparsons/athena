import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ThemeProvider } from '@mui/material';
import { theme } from '@athena/theme';
import { NewsletterPostsList } from '@athena/components';
import { MediaFormat, NewsletterPostTypeName } from '@athena/common';
import { createMockPost, mediaPost, textPost } from '../../util/test-data';

const meta: Meta<typeof NewsletterPostsList> = {
  component: NewsletterPostsList,
  title: 'NewsletterPostsList',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NewsletterPostsList>;

export const Primary = {
  args: {
    editing: true,
    existingPosts: [textPost],
  },
};

const p1 = {
  ...textPost,
  position: {
    ...textPost.position,
    nextId: mediaPost.id,
  },
};

const p2 = {
  ...mediaPost,
  position: {
    ...mediaPost.position,
    prevId: textPost.id,
  },
};

export const Multi = {
  args: {
    newsletterId: 1,
    editing: false,
    existingPosts: [p1, p2],
  },
};

export const MultiEditing = {
  args: {
    ...Multi.args,
    editing: true,
  },
};

const p3 = createMockPost({
  id: 3,
  position: {
    ...textPost.position,
    parentId: p2.id,
  },
});

export const Nested = {
  args: {
    newsletterId: 1,
    editing: true,
    existingPosts: [p1, p2, p3],
  },
};
