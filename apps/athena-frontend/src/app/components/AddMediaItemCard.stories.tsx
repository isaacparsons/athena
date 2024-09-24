import type { Meta, StoryObj } from '@storybook/react';
import AddMediaItemCard from './AddMediaItemCard';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof AddMediaItemCard> = {
  component: AddMediaItemCard,
  title: 'AddMediaItemCard',
};
export default meta;
type Story = StoryObj<typeof AddMediaItemCard>;

export const Primary = {
  args: {
    item: '',
    isSnapPoint: false,
  },
};

export const Heading: Story = {
  args: {
    item: '',
    isSnapPoint: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to AddMediaItemCard!/gi)).toBeTruthy();
  },
};
