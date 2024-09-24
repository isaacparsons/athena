import type { Meta, StoryObj } from '@storybook/react';
import AddMediaItemsDialog from './AddMediaItemsDialog';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AddMediaItemsDialog> = {
  component: AddMediaItemsDialog,
  title: 'AddMediaItemsDialog',
  argTypes: {
    handleClose: { action: 'handleClose executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof AddMediaItemsDialog>;

export const Primary = {
  args: {
    open: false,
    newsletterId: 0,
  },
};

export const Heading: Story = {
  args: {
    open: false,
    newsletterId: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AddMediaItemsDialog!/gi)).toBeTruthy();
  },
};
