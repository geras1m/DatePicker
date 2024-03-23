import { holidays, listOfMonth } from '@root/constants';
import { ICalendarDate, IInputDate } from '@root/types';
import { getCurrentDate } from '@utils/calendar/getCurrentDate';

const overDaysInMonth = 32;
const countCellsInMonth = 42;
const maxWeeksInMonth = 6;
const daysInAWeek = 7;

export const getCalendarDataForMonth = (year: number, month: number): ICalendarDate[] => {
  const { currentYear, currentMonth, currentDate } = getCurrentDate();

  const daysInPrevMonth = overDaysInMonth - new Date(year, month - 1, overDaysInMonth).getDate();
  const daysInCurrentMonth = overDaysInMonth - new Date(year, month, overDaysInMonth).getDate();

  const firstDayOfWeekInCurrentMonth = new Date(year, month, 1).getDay();

  let dayOfWeek = firstDayOfWeekInCurrentMonth - 1;
  const countDaysInPrevMonth = firstDayOfWeekInCurrentMonth === 0 ? 6 : firstDayOfWeekInCurrentMonth - 1;

  const daysPrevMonth = Array(countDaysInPrevMonth)
    .fill(daysInPrevMonth)
    .map((date, index) => {
      return {
        date: date - index,
        month: month - 1,
        isActive: false,
        dayOfWeek: countDaysInPrevMonth - index,
        isCurrent: false,
        isHoliday: false,
        year: null,
      };
    })
    .reverse();

  const daysCurrentMonth = Array(daysInCurrentMonth)
    .fill(1)
    .map((date, index) => {
      const dateDay = date + index;
      const isCurrent = currentYear === year && currentMonth === month && currentDate === dateDay;
      const isHoliday = holidays[month].includes(dateDay);

      dayOfWeek = dayOfWeek >= 6 ? 0 : dayOfWeek + 1;

      return { date: dateDay, isActive: true, isHoliday, dayOfWeek, isCurrent, month, year };
    });

  const countDaysForNextMonth = countCellsInMonth - (daysPrevMonth.length + daysCurrentMonth.length);

  const daysNextMonth = Array(countDaysForNextMonth)
    .fill(1)
    .map((date, index) => {
      dayOfWeek = dayOfWeek >= 6 ? 0 : dayOfWeek + 1;

      return {
        date: date + index,
        month: month + 1,
        isActive: false,
        dayOfWeek,
        isCurrent: false,
        isHoliday: false,
        year: null,
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

export const getCalendarDataForWeek = (year: number, month: number, currentDay: number) => {
  const allDaysOfMonth = getCalendarDataForMonth(year, month);
  const currentDayIndex = allDaysOfMonth.findIndex((day) => {
    return day.year && day.date === currentDay;
  });
  for (let weekInMonth = 0; weekInMonth < maxWeeksInMonth; weekInMonth += 1) {
    if (weekInMonth * daysInAWeek > currentDayIndex)
      return allDaysOfMonth.splice((weekInMonth - 1) * daysInAWeek, daysInAWeek);
  }
  return [];
};
