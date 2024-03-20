import { DayItem, NameDaysOfWeekWrapper } from '@components/Calendar/NameDaysOfWeek/styled';
import { memo } from 'react';

const daysMap = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const NameDaysOfWeek = memo(() => {
  return (
    <NameDaysOfWeekWrapper>
      {daysMap.map((day) => {
        return <DayItem key={day}>{day}</DayItem>;
      })}
    </NameDaysOfWeekWrapper>
  );
});
