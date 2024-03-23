import { DayItem, NameDaysOfWeekWrapper } from '@components/Calendar/NameDaysOfWeek/styled';
import { memo } from 'react';

const daysMap = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface NameDaysOfWeekProps {
  withWeekends: boolean;
}

export const NameDaysOfWeek = memo(({ withWeekends }: NameDaysOfWeekProps) => {
  const listOfDaysNameWithWeekends = daysMap.map((day) => {
    return <DayItem key={day}>{day}</DayItem>;
  });

  const listOfDays = withWeekends ? listOfDaysNameWithWeekends : listOfDaysNameWithWeekends.slice(0, 5);

  return <NameDaysOfWeekWrapper>{listOfDays}</NameDaysOfWeekWrapper>;
});
