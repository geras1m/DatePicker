import { DaysCell } from '@components/Calendar/DaysCell';
import { NameDaysOfWeek } from '@components/Calendar/NameDaysOfWeek';
import { NavigationBar } from '@components/Calendar/NavigationBar';
import { DaysList, WrapperCalendar } from '@components/Calendar/styled';
import { TodoModal } from '@components/TodoModal';
import { calendarView } from '@root/constants';
import { ICalendarProps } from '@root/types';
import {
  getCalendarDataForMonth,
  getCalendarDataForWeek,
  getCalendarDataForYear,
} from '@utils/calendar/getCalendarData';
import { getListOfDaysWithoutWeekends } from '@utils/calendar/getListOfDaysWithoutWeekends';
import { memo, useCallback, useMemo, useState } from 'react';

export const Calendar = memo(
  ({ inputDate, maxDate, minDate, withWeekends, startOfWeek = 'Mo', view = 'month' }: ICalendarProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeCellDate, setActiveCellDate] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();

    useMemo(() => {
      if (inputDate) setSelectedDate(new Date(`${inputDate.month}/${inputDate.day}/${inputDate.year}`));
    }, [inputDate]);

    const handleSwitchNextOrPrevCalendar = useCallback(
      (direction: 'next' | 'prev') => {
        const DirectionValue = direction === 'next' ? 1 : -1;

        let year = selectedDate.getFullYear();
        let month = selectedDate.getMonth();
        let day = selectedDate.getDate();

        if (view === calendarView.year) year += 1 * DirectionValue;
        if (view === calendarView.month) month += 1 * DirectionValue;
        if (view === calendarView.week) day += 7 * DirectionValue;

        const resultDate = new Date(year, month, day);

        if (resultDate < minDate || resultDate > maxDate) return;

        setSelectedDate(() => new Date(year, month, day));
      },
      [selectedDate, view, minDate, maxDate],
    );

    const handleSelectCell = useCallback((year: number, month: number, day: number) => {
      setActiveCellDate(`${day}/${month}/${year}`);
      setIsOpenModal(true);
    }, []);

    const handleCloseModal = () => {
      setIsOpenModal(false);
    };

    const getCalendarItemsForYear = () => {
      const calendarMonth = getCalendarDataForYear(selectedYear, inputDate);

      return calendarMonth.map(({ month, isCurrent, name, isSelected }) => {
        return (
          <DaysCell
            key={month}
            isMainCell
            isHoliday={false}
            isSelected={isSelected}
            isCurrent={isCurrent}
            content={name}
            handleActiveCell={null}
            isThereTodo={false}
          />
        );
      });
    };

    const getCalendarCells = () => {
      if (calendarView.year === view) return getCalendarItemsForYear();
      /* eslint-disable */
      const calendarItemsDataWithWeekends =
        calendarView.month === view
          ? getCalendarDataForMonth(selectedYear, selectedMonth, startOfWeek, withWeekends)
          : getCalendarDataForWeek(
              selectedYear,
              selectedMonth,
              selectedDate.getDate(),
              startOfWeek,
              withWeekends,
            );
      /* eslint-enable */

      const calendarItemsData = withWeekends
        ? calendarItemsDataWithWeekends
        : getListOfDaysWithoutWeekends(calendarItemsDataWithWeekends);

      return calendarItemsData.map(({ year, month, date, isCurrent, isActive, isHoliday, isThereTodo }) => {
        const isSelectedDay =
          inputDate && inputDate.year === year && inputDate.month - 1 === month && inputDate.day === date;

        return (
          <DaysCell
            key={`${date}${month}${year}`}
            isMainCell={isActive}
            isSelected={isSelectedDay}
            isCurrent={isCurrent}
            isHoliday={isHoliday}
            isThereTodo={isThereTodo}
            content={date}
            handleActiveCell={() => handleSelectCell(year, month, date)}
          />
        );
      });
    };

    return (
      <WrapperCalendar>
        <NavigationBar
          switchCalendar={handleSwitchNextOrPrevCalendar}
          year={selectedYear}
          month={calendarView.year !== view && selectedMonth}
        />

        {calendarView.year !== view && (
          <NameDaysOfWeek startOfWeek={startOfWeek} withWeekends={withWeekends} />
        )}

        <DaysList $view={view} $withWeekends={withWeekends}>
          {getCalendarCells()}
        </DaysList>

        {isOpenModal && <TodoModal date={activeCellDate} closeModal={handleCloseModal} />}
      </WrapperCalendar>
    );
  },
);
