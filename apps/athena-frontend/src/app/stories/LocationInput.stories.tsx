import type { Meta, StoryObj } from '@storybook/react';
import { fn } from "@storybook/test";
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LocationInput } from '@athena/components'

const meta: Meta<typeof LocationInput> = {
  component: LocationInput,
  title: 'LocationInput',
};
export default meta;
type Story = StoryObj<typeof LocationInput>;


export const Primary = {
  args: {

  },
};

export const WithLocation = {
  args: {
    location: {
      name: 'Test Location',
      countryCode: "CA",
      lattitude: 123.456,
      longitude: 789.101
    }
  },
};

export const Selected = {
  args: {
    selectable: true,
    selected: true,
    location: {
      name: 'Test Location',
      countryCode: "CA",
      lattitude: 123.456,
      longitude: 789.101
    }
  },
};