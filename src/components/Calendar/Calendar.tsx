import { DaysCell } from '@components/Calendar/DaysCell';
import { NameDaysOfWeek } from '@components/Calendar/NameDaysOfWeek';
import { NavigationBar } from '@components/Calendar/NavigationBar';
import { DaysList, WrapperCalendar } from '@components/Calendar/styled';
import { calendarView } from '@root/constants';
import { CalendarView, ICalendarDate } from '@root/types';
import {
  getCalendarDataForMonth,
  getCalendarDataForWeek,
  getCalendarDataForYear,
} from '@utils/calendar/getCalendarData';
import { memo, useCallback, useMemo, useState } from 'react';

export interface ICalendar {
  // minDate: number;
  // maxDate: number;
  view: CalendarView;
  inputDate: ICalendarDate | null;
}

export const Calendar = memo(({ inputDate, view = 'week' }: ICalendar) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useMemo(() => {
    if (inputDate) setSelectedDate(new Date(`${inputDate.month}/${inputDate.day}/${inputDate.year}`));
  }, [inputDate]);

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  const setPrevMonth = useCallback(() => {
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();
    let day = selectedDate.getDate();
    if (view === calendarView.year) year -= 1;
    if (view === calendarView.month) month -= 1;
    if (view === calendarView.week) day -= 7;

    setSelectedDate(() => new Date(year, month, day));
  }, [selectedDate, view]);

  const setNextMonth = useCallback(() => {
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();
    let day = selectedDate.getDate();
    if (view === calendarView.year) year += 1;
    if (view === calendarView.month) month += 1;
    if (view === calendarView.week) day += 7;

    setSelectedDate(() => new Date(year, month, day));
  }, [selectedDate, view]);

  const getCalendarItemsForMonth = () => {
    const calendarDays = getCalendarDataForMonth(selectedYear, selectedMonth);

    return calendarDays.map(({ year, month, date, isCurrent, isActive }) => {
      const isSelectedDay =
        inputDate && inputDate.year === year && inputDate.month - 1 === month && inputDate.day === date;

      return (
        <DaysCell
          key={`${date}${month}${year}`}
          isMainCell={isActive}
          isSelected={isSelectedDay}
          isCurrent={isCurrent}
          content={date}
        />
      );
    });
  };

  // TODO: обработчик событий, который по клику на месяц откроет месячный календарь

  const getCalendarItemsForYear = () => {
    const calendarMonth = getCalendarDataForYear(selectedYear);

    return calendarMonth.map(({ month, isCurrent, id }) => {
      return <DaysCell key={id} isMainCell isSelected={false} isCurrent={isCurrent} content={month} />;
    });
  };

  const getCalendarItemsForWeek = () => {
    const calendarWeek = getCalendarDataForWeek(selectedYear, selectedMonth, selectedDate.getDate());

    return calendarWeek.map(({ year, month, date, isCurrent, isActive }) => {
      const isSelectedDay =
        inputDate && inputDate.year === year && inputDate.month - 1 === month && inputDate.day === date;

      return (
        <DaysCell
          key={`${date}${month}${year}`}
          isMainCell={isActive}
          isSelected={isSelectedDay}
          isCurrent={isCurrent}
          content={date}
        />
      );
    });
  };

  getCalendarDataForWeek(selectedYear, selectedMonth, selectedDate.getDate());

  return (
    <WrapperCalendar>
      <NavigationBar
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
        year={selectedYear}
        month={calendarView.year !== view && selectedMonth}
      />

      {calendarView.year !== view && <NameDaysOfWeek />}

      <DaysList $view={view}>
        {calendarView.month === view && getCalendarItemsForMonth()}
        {calendarView.year === view && getCalendarItemsForYear()}
        {calendarView.week === view && getCalendarItemsForWeek()}
      </DaysList>
    </WrapperCalendar>
  );
});
