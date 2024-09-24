import type { Meta, StoryObj } from '@storybook/react';
import Newsletter from './Newsletter';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Newsletter> = {
  component: Newsletter,
  title: 'Newsletter',
};
export default meta;
type Story = StoryObj<typeof Newsletter>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Newsletter!/gi)).toBeTruthy();
  },
};
