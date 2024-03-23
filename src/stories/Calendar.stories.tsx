import { DatePicker } from '@components/DatePicker';
import { IDatePickerConfig } from '@root/types';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DatePicker> = {
  title: 'Date Picker',
  component: DatePicker,
  // argTypes: {
  //   selectedYear: {
  //     control: { type: 'number' },
  //   },
  //   selectedMonth: {
  //     control: { type: 'number' },
  //   },
  // },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PatePicker: Story = (args: IDatePickerConfig) => <DatePicker {...args} />;

PatePicker.args = {
  view: 'week',
  minDate: new Date(2024, 0, 1),
  maxDate: new Date(2025, 5, 1),
  withWeekends: true,
};
