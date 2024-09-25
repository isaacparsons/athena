import type { Meta, StoryObj } from '@storybook/react';
import BackButton from '../components/common/BackButton';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof BackButton> = {
  component: BackButton,
  title: 'BackButton',
  argTypes: {
    onClick: { action: 'onClick executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof BackButton>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to BackButton!/gi)).toBeTruthy();
  },
};
