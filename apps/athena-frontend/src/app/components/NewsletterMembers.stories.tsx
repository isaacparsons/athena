import type { Meta, StoryObj } from '@storybook/react';
import NewsletterMembers from './NewsletterMembers';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof NewsletterMembers> = {
  component: NewsletterMembers,
  title: 'NewsletterMembers',
};
export default meta;
type Story = StoryObj<typeof NewsletterMembers>;

export const Primary = {
  args: {
    members: '',
  },
};

export const Heading: Story = {
  args: {
    members: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to NewsletterMembers!/gi)).toBeTruthy();
  },
};
