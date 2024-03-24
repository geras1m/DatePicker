export interface IInputDate {
  year: number;
  month: number;
  day: number;
}

export type CalendarView = 'week' | 'month' | 'year';

export type StartWeek = 'Mo' | 'Su';

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
  isActive: boolean;
  dayOfWeek: number;
  isCurrent: boolean;
  isHoliday: boolean;
  isThereTodo: boolean;
  year: number;
}

export interface IDatePickerConfig {
  view: CalendarView;
  minDate: Date;
  maxDate: Date;
  withWeekends: boolean;
  startOfWeek: StartWeek;
}

export interface ITodo {
  todo: string;
}
