import { DaysCell } from '@components/Calendar/DaysCell';
import { NameDaysOfWeek } from '@components/Calendar/NameDaysOfWeek';
import { NavigationBar } from '@components/Calendar/NavigationBar';
import { DaysList, WrapperCalendar } from '@components/Calendar/styled';
import { ICalendarDate } from '@root/types';
import { getCalendarDates } from '@utils/calendar/getCalendarDates';
import { getCurrentDate } from '@utils/calendar/getCurrentDate';
import { memo, useCallback, useEffect, useState } from 'react';

export interface ICalendar {
  // minDate: number;
  // maxDate: number;
  inputDate: ICalendarDate | null;
}

export const Calendar = memo(({ inputDate }: ICalendar) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (inputDate) {
      setSelectedDate(new Date(`${inputDate.month}/${inputDate.day}/${inputDate.year}`));
    }
  }, [inputDate]);

  const { currentYear, currentMonth, currentDate } = getCurrentDate();

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  const setPrevMonth = useCallback(() => {
    setSelectedDate(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  }, [selectedDate]);

  const setNextMonth = useCallback(() => {
    setSelectedDate(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  }, [selectedDate]);

  const calendarDays = getCalendarDates(selectedYear, selectedMonth);

  return (
    <WrapperCalendar>
      <NavigationBar
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
        year={selectedYear}
        month={selectedMonth}
      />
      <NameDaysOfWeek />
      <DaysList>
        {calendarDays.map(({ year, month, date }) => {
          const isCurrentDay = currentYear === year && currentMonth === month && currentDate === date;
          const isSelectedDay =
            inputDate && inputDate.year === year && inputDate.month - 1 === month && inputDate.day === date;

          return (
            <DaysCell
              key={`${date}${month}`}
              isSelectedMonth={month === null}
              isSelectedDay={isSelectedDay}
              isCurrentDay={isCurrentDay}
              day={date}
            />
          );
        })}
      </DaysList>
    </WrapperCalendar>
  );
});
