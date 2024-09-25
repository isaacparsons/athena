import type { Meta, StoryObj } from '@storybook/react';
import NewsletterItemsList from '../components/NewsletterItemsList';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof NewsletterItemsList> = {
  component: NewsletterItemsList,
  title: 'NewsletterItemsList',
  argTypes: {
    onToggleSelect: { action: 'onToggleSelect executed!' },
    onToggleSelectAll: { action: 'onToggleSelectAll executed!' },
    onDelete: { action: 'onDelete executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof NewsletterItemsList>;

export const Primary = {
  args: {
    items: '',
    selectable: false,
    selectedItemIds: '',
  },
};

export const Heading: Story = {
  args: {
    items: '',
    selectable: false,
    selectedItemIds: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to NewsletterItemsList!/gi)).toBeTruthy();
  },
};
