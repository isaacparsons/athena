import type { Meta, StoryObj } from '@storybook/react';
import AddNewsletterDialog from '../components/AddNewsletterDialog';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AddNewsletterDialog> = {
  component: AddNewsletterDialog,
  title: 'AddNewsletterDialog',
  argTypes: {
    onClose: { action: 'handleClose executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof AddNewsletterDialog>;

export const Primary: Story = {
  args: {
    open: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AddMediaItemsDialog!/gi)).toBeTruthy();
  },
};
