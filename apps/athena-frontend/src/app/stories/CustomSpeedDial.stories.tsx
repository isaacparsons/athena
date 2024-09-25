import type { Meta, StoryObj } from '@storybook/react';
import CustomSpeedDial from '../components/CustomSpeedDial';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CustomSpeedDial> = {
  component: CustomSpeedDial,
  title: 'CustomSpeedDial',
  argTypes: {
    onOverrideIconClick: { action: 'onOverrideIconClick executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof CustomSpeedDial>;

export const Primary = {
  args: {
    actions: '',
    overrideIcon: '',
  },
};

export const Heading: Story = {
  args: {
    actions: '',
    overrideIcon: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to CustomSpeedDial!/gi)).toBeTruthy();
  },
};
