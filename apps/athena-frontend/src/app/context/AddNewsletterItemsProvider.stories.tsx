import type { Meta, StoryObj } from '@storybook/react';
import { AddNewsletterItemsProvider } from './AddNewsletterItemsProvider';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AddNewsletterItemsProvider> = {
  component: AddNewsletterItemsProvider,
  title: 'AddNewsletterItemsProvider',
};
export default meta;
type Story = StoryObj<typeof AddNewsletterItemsProvider>;

export const Primary = {
  args: {
    children: '',
  },
};

export const Heading: Story = {
  args: {
    children: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/Welcome to AddNewsletterItemsProvider!/gi)
    ).toBeTruthy();
  },
};
