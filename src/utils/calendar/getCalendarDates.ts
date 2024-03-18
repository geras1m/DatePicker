export const getCalendarDates = (year: number, month: number) => {
  const overDaysInMonth = 32;

  const daysInPrevMonth = overDaysInMonth - new Date(year, month - 1, overDaysInMonth).getDate();
  const daysInCurrentMonth = overDaysInMonth - new Date(year, month, overDaysInMonth).getDate();

  const firstDayOfWeekInCurrentMonth = new Date(year, month, 1).getDay();

  const daysPrevMonth = Array(firstDayOfWeekInCurrentMonth === 0 ? 6 : firstDayOfWeekInCurrentMonth - 1)
    .fill(daysInPrevMonth)
    .map((date, index) => {
      return { date: date - index, month: null, year: null };
    })
    .reverse();

  const daysCurrentMonth = Array(daysInCurrentMonth)
    .fill(1)
    .map((date, index) => {
      return { date: date + index, month, year };
    });

  const countDaysForNextMonth = 42 - (daysPrevMonth.length + daysCurrentMonth.length);

  const daysNextMonth = Array(countDaysForNextMonth)
    .fill(1)
    .map((date, index) => {
      return { date: date + index, month: null, year: null };
    });

  // console.log(daysPrevMonth, daysCurrentMonth, daysNextMonth);
  return [...daysPrevMonth, ...daysCurrentMonth, ...daysNextMonth];
};
