import { CellWrapper, TodoIndicator } from '@components/Calendar/DaysCell/styled';
import { RangeCellType } from '@root/types';
import { memo } from 'react';

interface IDaysCell {
  content: number | string;
  isCurrent: boolean;
  isMainCell: boolean;
  isSelected: boolean;
  isHoliday: boolean;
  isThereTodo: boolean;
  isSetRange: null | RangeCellType;
  handleActiveCell: () => void;
  handlePickRangeByCell: () => void;
}

export const DaysCell = memo(
  ({
    isCurrent,
    isSelected,
    isMainCell,
    isHoliday,
    content,
    handleActiveCell,
    isThereTodo,
    isSetRange,
    handlePickRangeByCell,
  }: IDaysCell) => {
    return (
      <CellWrapper
        onDoubleClick={handleActiveCell}
        onClick={handlePickRangeByCell}
        $isSelectedDay={isSelected}
        $isCurrentDay={isCurrent}
        $isSelectedMonth={isMainCell}
        $isHoliday={isHoliday}
        $isSetRange={isSetRange}
      >
        {content}
        {isThereTodo && <TodoIndicator />}
      </CellWrapper>
    );
  },
);
