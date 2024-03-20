import { CellWrapper } from '@components/Calendar/DaysCell/styled';
import { memo } from 'react';

interface IDaysCell {
  content: number | string;
  isCurrent: boolean;
  isMainCell: boolean;
  isSelected: boolean;
}

export const DaysCell = memo(({ isCurrent, isSelected, isMainCell, content }: IDaysCell) => {
  return (
    <CellWrapper $isSelectedDay={isSelected} $isCurrentDay={isCurrent} $isSelectedMonth={isMainCell}>
      {content}
    </CellWrapper>
  );
});
