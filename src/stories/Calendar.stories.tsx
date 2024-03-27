import { DatePicker } from '@components/DatePicker';
import { IRangeDatePickerConfig } from '@root/types';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DatePicker> = {
  title: 'Date Picker',
  component: DatePicker,
  argTypes: {
    startOfWeek: {
      control: 'radio',
      options: ['Mo', 'Su'],
      defaultValue: 'Mo',
    },
    startDateRange: {
      control: 'null',
    },
    endDateRange: {
      control: 'null',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PatePicker: Story = (args: IRangeDatePickerConfig) => <DatePicker {...args} />;

PatePicker.args = {
  view: 'week',
  minDate: new Date(2024, 0, 1),
  maxDate: new Date(2025, 5, 1),
  startDateRange: '02/03/2024',
  endDateRange: '15/03/2024',
  withWeekends: true,
  startOfWeek: 'Mo',
};
