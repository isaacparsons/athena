import type { Meta, StoryObj } from '@storybook/react';
import LocationInput from '../components/LocationInput';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof LocationInput> = {
  component: LocationInput,
  title: 'LocationInput',
  argTypes: {
    handleOpenLocationDialog: { action: 'handleOpenLocationDialog executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof LocationInput>;

export const Primary = {
  args: {
    id: 0,
    location: '',
  },
};

export const Heading: Story = {
  args: {
    id: 0,
    location: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to LocationInput!/gi)).toBeTruthy();
  },
};
