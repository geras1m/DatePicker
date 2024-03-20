import { listOfMonth } from '@root/constants';
import { getCurrentDate } from '@utils/calendar/getCurrentDate';

const overDaysInMonth = 32;
const countCellsInMonth = 42;

export const getCalendarDataForMonth = (year: number, month: number) => {
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
        month: month + 1,
        isActive: false,
        dayOfWeek: countDaysInPrevMonth - index,
        isCurrent: false,
        year: null,
      };
    })
    .reverse();

  const daysCurrentMonth = Array(daysInCurrentMonth)
    .fill(1)
    .map((date, index) => {
      const dateDay = date + index;
      const isCurrent = currentYear === year && currentMonth === month && currentDate === dateDay;

      dayOfWeek = dayOfWeek >= 6 ? 0 : dayOfWeek + 1;

      return { date: dateDay, isActive: true, dayOfWeek, isCurrent, month, year };
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
        year: null,
      };
    });

  return [...daysPrevMonth, ...daysCurrentMonth, ...daysNextMonth];
};

export const getCalendarDataForYear = (year: number) => {
  const { currentYear, currentMonth } = getCurrentDate();

  return listOfMonth.map((month) => {
    const isCurrent = year === currentYear && currentMonth === month.id - 1;
    return { ...month, isCurrent };
  });
};

export const getCalendarDataForWeek = (year: number, month: number, currentDay: number) => {
  const allDaysOfMonth = getCalendarDataForMonth(year, month);
  const currentDayIndex = allDaysOfMonth.findIndex((day) => {
    return day.year && day.date === currentDay;
  });
  for (let i = 0; i < 6; i += 1) {
    if (i * 7 >= currentDayIndex) return allDaysOfMonth.splice((i - 1) * 7, 7);
  }
  return [];
};
