import { holidays, listOfMonth } from '@root/constants';
import { ICalendarDate, IInputDate, StartWeek } from '@root/types';
import { getCurrentDate } from '@utils/calendar/getCurrentDate';
import { getDaysWithTodosForMonth } from '@utils/calendar/localStorage';

const overDaysInMonth = 32;
const countCellsInMonth = 42;
const maxWeeksInMonth = 6;
const daysInAWeek = 7;

export const getCalendarDataForMonth = (
  year: number,
  month: number,
  startWeek: StartWeek,
  withWeekends: boolean,
): ICalendarDate[] => {
  const { currentYear, currentMonth, currentDate } = getCurrentDate();

  const daysInPrevMonth = overDaysInMonth - new Date(year, month - 1, overDaysInMonth).getDate();
  const daysInCurrentMonth = overDaysInMonth - new Date(year, month, overDaysInMonth).getDate();

  const firstDayOfWeekInCurrentMonth = new Date(year, month, 1).getDay();
  let dayOfWeek = firstDayOfWeekInCurrentMonth - 1;

  const toDifferentStartOfWeek = startWeek === 'Mo' || !withWeekends ? 1 : 0;
  const endOfWeek = startWeek === 'Mo' ? 6 : 7;
  const countDaysInPrevMonth =
    firstDayOfWeekInCurrentMonth === 0 ? endOfWeek : firstDayOfWeekInCurrentMonth - toDifferentStartOfWeek;

  const dateForPrevMonth = new Date(year, month - 1, 1);
  const prevMonth = dateForPrevMonth.getMonth();
  const prevYear = dateForPrevMonth.getFullYear();

  const daysWithTodoPrevMonth = getDaysWithTodosForMonth(prevMonth, prevYear);

  const daysPrevMonth = Array(countDaysInPrevMonth)
    .fill(daysInPrevMonth)
    .map((date, index) => {
      const dateDay = date - index;
      const isThereTodo = daysWithTodoPrevMonth.includes(dateDay);

      return {
        date: dateDay,
        month: prevMonth,
        isActive: false,
        dayOfWeek: countDaysInPrevMonth - index,
        isCurrent: false,
        isHoliday: false,
        isThereTodo,
        year: prevYear,
      };
    })
    .reverse();

  const daysWithTodoCurrentMonth = getDaysWithTodosForMonth(month, year);

  const daysCurrentMonth = Array(daysInCurrentMonth)
    .fill(1)
    .map((date, index) => {
      const dateDay = date + index;
      const isCurrent = currentYear === year && currentMonth === month && currentDate === dateDay;
      const isHoliday = holidays[month].includes(dateDay);
      const isThereTodo = daysWithTodoCurrentMonth.includes(dateDay);

      dayOfWeek = dayOfWeek >= 6 ? 0 : dayOfWeek + 1;

      return { date: dateDay, isActive: true, isHoliday, isThereTodo, dayOfWeek, isCurrent, month, year };
    });

  const countDaysForNextMonth = countCellsInMonth - (daysPrevMonth.length + daysCurrentMonth.length);

  const dateForNextMonth = new Date(year, month + 1, 1);
  const nextMonth = dateForNextMonth.getMonth();
  const nextYear = dateForNextMonth.getFullYear();

  const daysWithTodoNextMonth = getDaysWithTodosForMonth(nextMonth, nextYear);

  const daysNextMonth = Array(countDaysForNextMonth)
    .fill(1)
    .map((date, index) => {
      const dateDay = date + index;
      const isThereTodo = daysWithTodoNextMonth.includes(dateDay);
      dayOfWeek = dayOfWeek >= 6 ? 0 : dayOfWeek + 1;

      return {
        date: dateDay,
        month: nextMonth,
        isActive: false,
        dayOfWeek,
        isCurrent: false,
        isHoliday: false,
        isThereTodo,
        year: nextYear,
      };
    });

  return [...daysPrevMonth, ...daysCurrentMonth, ...daysNextMonth];
};

export const getCalendarDataForYear = (year: number, inputDate: IInputDate | null) => {
  const { currentYear, currentMonth } = getCurrentDate();

  return listOfMonth.map((monthData) => {
    const isCurrent = year === currentYear && currentMonth === monthData.month;
    const isSelected = inputDate && inputDate.month === monthData.month + 1 && inputDate.year === year;

    return { ...monthData, isCurrent, isSelected };
  });
};

export const getCalendarDataForWeek = (
  year: number,
  month: number,
  currentDay: number,
  startOfWeek: StartWeek,
  withWeekends: boolean,
) => {
  const allDaysOfMonth = getCalendarDataForMonth(year, month, startOfWeek, withWeekends);
  const currentDayIndex = allDaysOfMonth.findIndex((day) => {
    return day.year === year && day.month === month && day.date === currentDay;
  });

  for (let weekInMonth = 0; weekInMonth <= maxWeeksInMonth; weekInMonth += 1) {
    if (weekInMonth * daysInAWeek >= currentDayIndex) {
      const startIndexWeek = (weekInMonth - 1) * daysInAWeek;
      const endIndexWeek = startIndexWeek + daysInAWeek;

      return allDaysOfMonth.slice(startIndexWeek, endIndexWeek);
    }
  }
  return [];
};
