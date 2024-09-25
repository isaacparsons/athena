import type { Meta, StoryObj } from '@storybook/react';
import AppRoutes from '../AppRoutes';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AppRoutes> = {
  component: AppRoutes,
  title: 'AppRoutes',
};
export default meta;
type Story = StoryObj<typeof AppRoutes>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AppRoutes!/gi)).toBeTruthy();
  },
};
