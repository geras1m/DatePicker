import { RangeCellType } from '@root/types';

export const getCellValueForRange = (
  startRange: string,
  endRange: string,
  year: number,
  month: number,
  day: number,
): null | RangeCellType => {
  if (!startRange || !endRange) return null;

  const [startDay, startMonth, startYear] = startRange.split('/').map((el) => Number(el));
  const [endDay, endMonth, endYear] = endRange.split('/').map((el) => Number(el));

  const startRangeDate = new Date(startYear, startMonth - 1, startDay).getTime();
  const currentDate = new Date(year, month, day).getTime();
  const endRangeDate = new Date(endYear, endMonth - 1, endDay).getTime();

  if (startRangeDate === currentDate) return 'start';
  if (endRangeDate === currentDate) return 'end';
  if (currentDate > startRangeDate && currentDate < endRangeDate) return 'middle';

  return null;
};
