import type { Meta, StoryObj } from '@storybook/react';
import ConfirmationDialog from '../components/ConfirmationDialog';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ConfirmationDialog> = {
  component: ConfirmationDialog,
  title: 'ConfirmationDialog',
  argTypes: {
    onCloseDialog: { action: 'onCloseDialog executed!' },
    onConfirm: { action: 'onConfirm executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof ConfirmationDialog>;

export const Primary = {
  args: {
    open: false,
    loading: false,
    title: '',
    content: '',
  },
};

export const Heading: Story = {
  args: {
    open: false,
    loading: false,
    title: '',
    content: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ConfirmationDialog!/gi)).toBeTruthy();
  },
};
