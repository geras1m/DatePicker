import { CellWrapper } from '@components/Calendar/DaysCell/styled';
import { memo } from 'react';

interface IDaysCell {
  day: number;
  isCurrentDay: boolean;
  isSelectedMonth: boolean;
  isSelectedDay: boolean;
}

export const DaysCell = memo(({ isCurrentDay, isSelectedDay, isSelectedMonth, day }: IDaysCell) => {
  return (
    <CellWrapper
      $isSelectedDay={isSelectedDay}
      $isCurrentDay={isCurrentDay}
      $isSelectedMonth={isSelectedMonth}
    >
      {day}
    </CellWrapper>
  );
});
