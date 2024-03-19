import NextArrow from '@assets/NextArrow.svg';
import PrevArrow from '@assets/PrevArrow.svg';
import { MonthAndYear, NavButton, NavigationWrapper } from '@components/Calendar/NavigationBar/styled';
import { memo } from 'react';

export const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface INavigationBar {
  year: number;
  month: number;
  setNextMonth: () => void;
  setPrevMonth: () => void;
}

export const NavigationBar = memo(({ year, month, setNextMonth, setPrevMonth }: INavigationBar) => {
  return (
    <NavigationWrapper>
      <NavButton>
        <PrevArrow onClick={setPrevMonth} />
      </NavButton>
      <MonthAndYear>
        {monthMap[month]} {year}
      </MonthAndYear>
      <NavButton>
        <NextArrow onClick={setNextMonth} />
      </NavButton>
    </NavigationWrapper>
  );
});
