import { ChangeEvent } from 'react';

export interface IInputDate {
  year: number;
  month: number;
  day: number;
}

export type CalendarView = 'week' | 'month' | 'year';

export type StartWeek = 'Mo' | 'Su';

export type RangeCellType = 'start' | 'end' | 'middle';

export type InputRangeType = 'from' | 'to';

export interface ICalendarProps {
  view: CalendarView;
  inputDate: IInputDate | null;
  maxDate: Date;
  minDate: Date;
  withWeekends: boolean;
  startOfWeek: StartWeek;
}

export interface ICalendarDate {
  date: number;
  month: number;
  year: number;
  dayOfWeek: number;
  isActive: boolean;
  isCurrent: boolean;
  isHoliday: boolean;
  isThereTodo: boolean;
}

export interface ISimpleDatePickerConfig {
  view: CalendarView;
  minDate: Date;
  maxDate: Date;
  withWeekends: boolean;
  startOfWeek: StartWeek;
}

export interface IRangeDatePickerConfig extends ISimpleDatePickerConfig {
  startDateRange: string;
  endDateRange: string;
}

export interface IRangeContext {
  rangeStartAndEndDates: string[];
  handlePickRangeByCell: (year: number, month: number, date: number) => void;
  handleClearRange: () => void;
}
