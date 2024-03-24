import { CellWrapper, TodoIndicator } from '@components/Calendar/DaysCell/styled';
import { memo } from 'react';

interface IDaysCell {
  content: number | string;
  isCurrent: boolean;
  isMainCell: boolean;
  isSelected: boolean;
  isHoliday: boolean;
  isThereTodo: boolean;
  handleActiveCell: () => void;
}

export const DaysCell = memo(
  ({ isCurrent, isSelected, isMainCell, isHoliday, content, handleActiveCell, isThereTodo }: IDaysCell) => {
    return (
      <CellWrapper
        onDoubleClick={handleActiveCell}
        $isSelectedDay={isSelected}
        $isCurrentDay={isCurrent}
        $isSelectedMonth={isMainCell}
        $isHoliday={isHoliday}
      >
        {content}
        {isThereTodo && <TodoIndicator />}
      </CellWrapper>
    );
  },
);
