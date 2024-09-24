import type { Meta, StoryObj } from '@storybook/react';
import { AuthProvider } from './AuthProvider';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AuthProvider> = {
  component: AuthProvider,
  title: 'AuthProvider',
};
export default meta;
type Story = StoryObj<typeof AuthProvider>;

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
    expect(canvas.getByText(/Welcome to AuthProvider!/gi)).toBeTruthy();
  },
};
