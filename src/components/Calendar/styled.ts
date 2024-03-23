import { calendarView } from '@root/constants';
import { CalendarView } from '@root/types';
import styled from 'styled-components';

interface IDaysListProps {
  $view: CalendarView;
  $withWeekends: boolean;
}

export const WrapperCalendar = styled.div`
  width: 250px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
`;

export const DaysList = styled.ul<IDaysListProps>`
  display: grid;
  padding: 0;
  justify-content: space-between;
  justify-items: center;

  ${({ $view, $withWeekends }) =>
    $view === calendarView.month &&
    `
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(${$withWeekends ? 7 : 5}, 1fr);
  `}

  ${({ $view, $withWeekends }) =>
    $view === calendarView.week &&
    `
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(${$withWeekends ? 7 : 5}, 1fr);
  `}

  ${({ $view }) =>
    $view === calendarView.year &&
    `
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);
  `}
`;
