import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '../components/Carousel';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Carousel',
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Carousel!/gi)).toBeTruthy();
  },
};
