import type { Meta, StoryObj } from '@storybook/react';
import { APIProvider } from './APIProvider';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof APIProvider> = {
  component: APIProvider,
  title: 'APIProvider',
};
export default meta;
type Story = StoryObj<typeof APIProvider>;

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
    expect(canvas.getByText(/Welcome to APIProvider!/gi)).toBeTruthy();
  },
};
