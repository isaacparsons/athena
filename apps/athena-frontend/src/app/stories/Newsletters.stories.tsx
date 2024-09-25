import type { Meta, StoryObj } from '@storybook/react';
import { Newsletters } from '../components/Newsletters';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Newsletters> = {
  component: Newsletters,
  title: 'Newsletters',
};
export default meta;
type Story = StoryObj<typeof Newsletters>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Newsletters!/gi)).toBeTruthy();
  },
};
