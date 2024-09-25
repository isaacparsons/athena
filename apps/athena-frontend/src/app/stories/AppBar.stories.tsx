import type { Meta, StoryObj } from '@storybook/react';
import { Appbar } from '../components/common/AppBar';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Appbar> = {
  component: Appbar,
  title: 'Appbar',
};
export default meta;
type Story = StoryObj<typeof Appbar>;

export const Primary = {
  args: {
    right: '',
    title: '',
  },
};

export const Heading: Story = {
  args: {
    right: '',
    title: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Appbar!/gi)).toBeTruthy();
  },
};
