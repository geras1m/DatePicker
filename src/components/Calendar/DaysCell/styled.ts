import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

interface ICellWrapperProps {
  $isCurrentDay: boolean;
  $isSelectedMonth: boolean;
  $isSelectedDay: boolean;
  $isHoliday: boolean;
}

export const CellWrapper = styled.li<ICellWrapperProps>`
  list-style: none;
  width: 100%;
  height: 25px;
  font-size: ${({ theme }) => theme.fontSizes.px14};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  padding: 5px 0;
  border-radius: 8px;
  border: none;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })};

  ${({ $isHoliday, theme }) => $isHoliday && `color: ${theme.colors.red};`}

  ${({ $isCurrentDay, theme }) =>
    $isCurrentDay &&
    `
    background-color: ${theme.colors.blue}; color: ${theme.colors.white};
  `}

  ${({ $isSelectedDay, theme }) =>
    $isSelectedDay && `border: 1px solid ${theme.colors.black}; color: ${theme.colors.green};`}

  ${({ $isSelectedMonth, theme }) => !$isSelectedMonth && `color: ${theme.colors.grey};`}
`;
