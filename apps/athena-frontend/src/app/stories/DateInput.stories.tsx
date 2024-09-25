import type { Meta, StoryObj } from '@storybook/react';
import DateInput from '../components/common/DateInput';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'DateInput',
  argTypes: {
    onChange: { action: 'onChange executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof DateInput>;

export const Primary = {
  args: {
    id: 0,
    date: '',
  },
};

export const Heading: Story = {
  args: {
    id: 0,
    date: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DateInput!/gi)).toBeTruthy();
  },
};
