import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CustomDate } from '@athena/components';

const meta: Meta<typeof CustomDate> = {
  component: CustomDate,
  title: 'CustomDate',
};
export default meta;
type Story = StoryObj<typeof CustomDate>;

export const Edit = {
  args: {
    onChange: () => console.log('hi'),
  },
};

export const Primary = {
  args: {
    readonly: true,
  },
};
