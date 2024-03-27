import { NameDaysOfWeek } from '@components/Calendar/NameDaysOfWeek';
import { NavigationBar } from '@components/Calendar/NavigationBar';
import { DaysList, WrapperCalendar } from '@components/Calendar/styled';
import { ClearRangeButton } from '@components/RangeInputBlock/styled';
import { TodoModal } from '@components/TodoModal';
import { RangeContext } from '@hocs/withRange';
import { calendarView } from '@root/constants';
import { ICalendarProps } from '@root/types';
import { getCalendarCells } from '@utils/calendar/getCalendarCells';
import { memo, useCallback, useContext, useState } from 'react';

export const Calendar = memo(
  ({ inputDate, maxDate, minDate, withWeekends, startOfWeek = 'Mo', view = 'month' }: ICalendarProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeCellDate, setActiveCellDate] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [prevInputDate, setPrevInputDate] = useState(inputDate);
    const rangeContext = useContext(RangeContext);

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();

    const [startRange, endRange] = rangeContext ? rangeContext.rangeStartAndEndDates : [null, null];
    const handlePickRangeByCell = rangeContext ? rangeContext.handlePickRangeByCell : null;
    const handleClearRange = rangeContext ? rangeContext.handleClearRange : null;

    if (
      inputDate.year !== prevInputDate.year ||
      inputDate.month !== prevInputDate.month ||
      inputDate.day !== prevInputDate.day
    ) {
      const { year, month, day } = inputDate;
      if (year && month && day) setSelectedDate(new Date(`${month}/${day}/${year}`));
      setPrevInputDate(inputDate);
    }

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

    const cellsList = getCalendarCells({
      view,
      selectedYear,
      selectedMonth,
      selectedDate: selectedDate.getDate(),
      startOfWeek,
      withWeekends,
      inputDate,
      handleSelectCell,
      handlePickRangeByCell,
      startRange,
      endRange,
    });

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
          {cellsList}
        </DaysList>

        {rangeContext && handleClearRange && (
          <ClearRangeButton type='button' onClick={handleClearRange}>
            Clear
          </ClearRangeButton>
        )}

        {isOpenModal && <TodoModal date={activeCellDate} closeModal={handleCloseModal} />}
      </WrapperCalendar>
    );
  },
);
