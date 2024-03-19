import { DayItem, NameDaysOfWeekWrapper } from '@components/Calendar/NameDaysOfWeek/styled';

const daysMap = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const NameDaysOfWeek = () => {
  return (
    <NameDaysOfWeekWrapper>
      {daysMap.map((day) => {
        return <DayItem key={day}>{day}</DayItem>;
      })}
    </NameDaysOfWeekWrapper>
  );
};
