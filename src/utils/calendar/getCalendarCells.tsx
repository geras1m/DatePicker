import { DaysCell } from '@components/Calendar/DaysCell';
import { calendarView } from '@root/constants';
import { CalendarView, IInputDate, StartWeek } from '@root/types';
import {
  getCalendarDataForMonth,
  getCalendarDataForWeek,
  getCalendarDataForYear,
} from '@utils/calendar/getCalendarData';
import { getListOfDaysWithoutWeekends } from '@utils/calendar/getListOfDaysWithoutWeekends';

interface IGetCalendarCells {
  view: CalendarView;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: number;
  inputDate: IInputDate;
  withWeekends: boolean;
  startOfWeek: StartWeek;
  handleSelectCell: (year: number, month: number, date: number) => void;
}

const getCalendarCellsForYear = (selectedYear: number, inputDate: IInputDate) => {
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

export const getCalendarCells = ({
  view,
  selectedYear,
  selectedMonth,
  selectedDate,
  inputDate,
  withWeekends,
  startOfWeek,
  handleSelectCell,
}: IGetCalendarCells) => {
  if (calendarView.year === view) return getCalendarCellsForYear(selectedYear, inputDate);

  const calendarItemsDataWithWeekends =
    calendarView.month === view
      ? getCalendarDataForMonth(selectedYear, selectedMonth, startOfWeek, withWeekends)
      : getCalendarDataForWeek(selectedYear, selectedMonth, selectedDate, startOfWeek, withWeekends);

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
