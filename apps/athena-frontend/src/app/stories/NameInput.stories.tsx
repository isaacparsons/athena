import type { Meta, StoryObj } from '@storybook/react';
import NameInput from '../components/common/NameInput';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof NameInput> = {
  component: NameInput,
  title: 'NameInput',
};
export default meta;
type Story = StoryObj<typeof NameInput>;

export const Primary = {
  args: {
    id: 0,
    name: '',
  },
};

export const Heading: Story = {
  args: {
    id: 0,
    name: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to NameInput!/gi)).toBeTruthy();
  },
};
