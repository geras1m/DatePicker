import { ICalendarDate } from '@root/types';

export const getListOfDaysWithoutWeekends = (listOfDays: ICalendarDate[]) => {
  const saturday = 6;
  const sunday = 0;
  return listOfDays.filter(({ dayOfWeek }) => dayOfWeek !== saturday && dayOfWeek !== sunday);
};
