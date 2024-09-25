import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Login from '../pages/Login';

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'Login',
};
export default meta;
type Story = StoryObj<typeof Login>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Login!/gi)).toBeTruthy();
  },
};
