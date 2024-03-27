import { mixinFlex } from '@components/ThemeProvider/styled';
import { RangeCellType } from '@root/types';
import styled from 'styled-components';

interface ICellWrapperProps {
  $isCurrentDay: boolean;
  $isSelectedMonth: boolean;
  $isSelectedDay: boolean;
  $isHoliday: boolean;
  $isSetRange: null | RangeCellType;
}

export const TodoIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: green;
`;

export const CellWrapper = styled.li<ICellWrapperProps>`
  position: relative;
  list-style: none;
  width: 100%;
  height: 25px;
  font-size: ${({ theme }) => theme.fontSizes.px14};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  padding: 5px 0;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in background-color;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })};

  &:hover {
    background-color: ${({ $isCurrentDay }) => !$isCurrentDay && 'rgba(0, 0, 0, 0.11)'};
  }

  ${({ $isSetRange }) =>
    $isSetRange &&
    $isSetRange === 'start' &&
    `
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #2F80ED99;
    color: white;`}

  ${({ $isSetRange }) =>
    $isSetRange &&
    $isSetRange === 'middle' &&
    `
    border-radius: 0;
    background-color: #2F80ED1A;
    color: #2F80ED;`}
  
  ${({ $isSetRange }) =>
    $isSetRange &&
    $isSetRange === 'end' &&
    `
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #2F80ED;
    color: white;`}

  ${({ $isCurrentDay, theme }) =>
    $isCurrentDay &&
    `
    background-color: ${theme.colors.blue}; color: ${theme.colors.white};
  `}

  ${({ $isHoliday, theme }) => $isHoliday && `color: ${theme.colors.red};`}

  ${({ $isSelectedDay, theme }) =>
    $isSelectedDay && `border: 1px solid ${theme.colors.black}; color: ${theme.colors.green};`}

  ${({ $isSelectedMonth, theme }) => !$isSelectedMonth && `color: ${theme.colors.grey};`}
`;
