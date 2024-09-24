import type { Meta, StoryObj } from '@storybook/react';
import EditItemLocation from './EditItemLocation';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof EditItemLocation> = {
  component: EditItemLocation,
  title: 'EditItemLocation',
  argTypes: {
    handleClose: { action: 'handleClose executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof EditItemLocation>;

export const Primary = {
  args: {
    open: true,
  },
};

export const Heading: Story = {
  args: {
    open: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to EditItemLocation!/gi)).toBeTruthy();
  },
};
