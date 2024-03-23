import { DayItem, NameDaysOfWeekWrapper } from '@components/Calendar/NameDaysOfWeek/styled';
import { StartWeek } from '@root/types';
import { memo } from 'react';

interface NameDaysOfWeekProps {
  withWeekends: boolean;
  startOfWeek: StartWeek;
}

const daysMapFromMonday = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const daysMapFromSunday = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const NameDaysOfWeek = memo(({ withWeekends, startOfWeek }: NameDaysOfWeekProps) => {
  const daysMap = startOfWeek === daysMapFromMonday[0] ? daysMapFromMonday : daysMapFromSunday;
  const listOfDays = withWeekends ? daysMap : daysMapFromMonday.slice(0, 5);

  const listOfDaysName = listOfDays.map((day) => {
    return <DayItem key={day}>{day}</DayItem>;
  });

  return <NameDaysOfWeekWrapper>{listOfDaysName}</NameDaysOfWeekWrapper>;
});
