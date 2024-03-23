export interface IInputDate {
  year: number;
  month: number;
  day: number;
}

export type CalendarView = 'week' | 'month' | 'year';

export interface ICalendarDate {
  date: number;
  month: number;
  isActive: boolean;
  dayOfWeek: number;
  isCurrent: boolean;
  year: number;
}

export interface IDatePickerConfig {
  view: CalendarView;
  minDate: Date;
  maxDate: Date;
  withWeekends: boolean;
}
