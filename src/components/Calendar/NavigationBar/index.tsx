import NextArrow from '@assets/NextArrow.svg';
import PrevArrow from '@assets/PrevArrow.svg';
import {
  Hint,
  HintMessage,
  HintWrapper,
  MonthAndYear,
  NavButton,
  NavigationWrapper,
} from '@components/Calendar/NavigationBar/styled';
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
  switchCalendar: (direction: 'next' | 'prev') => void;
}

export const NavigationBar = memo(({ year, month, switchCalendar }: INavigationBar) => {
  const switchToNext = () => switchCalendar('next');
  const switchToPrev = () => switchCalendar('prev');

  return (
    <NavigationWrapper>
      <NavButton>
        <PrevArrow onClick={switchToPrev} />
      </NavButton>
      <MonthAndYear>
        {monthMap[month]} {year}
        <HintWrapper>
          <Hint>?</Hint>
          <HintMessage>Double-click on the date to add a task</HintMessage>
        </HintWrapper>
      </MonthAndYear>
      <NavButton>
        <NextArrow onClick={switchToNext} />
      </NavButton>
    </NavigationWrapper>
  );
});
