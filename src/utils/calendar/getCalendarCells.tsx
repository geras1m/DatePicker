import { DaysCell } from '@components/Calendar/DaysCell';
import { calendarView } from '@root/constants';
import { CalendarView, IInputDate, StartWeek } from '@root/types';
import {
  getCalendarDataForMonth,
  getCalendarDataForWeek,
  getCalendarDataForYear,
} from '@utils/calendar/getCalendarData';
import { getCellValueForRange } from '@utils/calendar/getCellValueForRange';
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
  handlePickRangeByCell: (year: number, month: number, date: number) => void;
  startRange: string;
  endRange: string;
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
        handlePickRangeByCell={null}
        handleActiveCell={null}
        isThereTodo={false}
        isSetRange={null}
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
  handlePickRangeByCell,
  startRange,
  endRange,
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

    const rangeValue = getCellValueForRange(startRange, endRange, year, month, date);

    return (
      <DaysCell
        key={`${date}${month}${year}`}
        isMainCell={isActive}
        isSelected={isSelectedDay}
        isCurrent={isCurrent}
        isHoliday={isHoliday}
        isThereTodo={isThereTodo}
        isSetRange={rangeValue}
        content={date}
        handlePickRangeByCell={() => handlePickRangeByCell && handlePickRangeByCell(year, month, date)}
        handleActiveCell={() => handleSelectCell(year, month, date)}
      />
    );
  });
};
