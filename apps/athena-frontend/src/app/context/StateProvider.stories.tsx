import type { Meta, StoryObj } from '@storybook/react';
import { StateProvider } from './StateProvider';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof StateProvider> = {
  component: StateProvider,
  title: 'StateProvider',
};
export default meta;
type Story = StoryObj<typeof StateProvider>;

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
    expect(canvas.getByText(/Welcome to StateProvider!/gi)).toBeTruthy();
  },
};
