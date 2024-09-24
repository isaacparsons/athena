import type { Meta, StoryObj } from '@storybook/react';
import NewsletterCard from './NewsletterCard';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof NewsletterCard> = {
  component: NewsletterCard,
  title: 'NewsletterCard',
};
export default meta;
type Story = StoryObj<typeof NewsletterCard>;

export const Primary = {
  args: {
    newsletter: {
      id: 1,
      name: 'mock name',
      created: new Date().toISOString(),
      modified: new Date(2024, 1, 20).toISOString(),
      ownerId: 1,
      startDate: new Date(2024, 1, 1).toISOString(),
      endDate: new Date(2024, 2, 1).toISOString(),
    },
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to NewsletterCard!/gi)).toBeTruthy();
  },
};
