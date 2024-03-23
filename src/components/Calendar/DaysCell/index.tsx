import { CellWrapper } from '@components/Calendar/DaysCell/styled';
import { memo } from 'react';

interface IDaysCell {
  content: number | string;
  isCurrent: boolean;
  isMainCell: boolean;
  isSelected: boolean;
  isHoliday: boolean;
}

export const DaysCell = memo(({ isCurrent, isSelected, isMainCell, isHoliday, content }: IDaysCell) => {
  return (
    <CellWrapper
      $isSelectedDay={isSelected}
      $isCurrentDay={isCurrent}
      $isSelectedMonth={isMainCell}
      $isHoliday={isHoliday}
    >
      {content}
    </CellWrapper>
  );
});
