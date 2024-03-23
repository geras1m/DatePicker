import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

export const NameDaysOfWeekWrapper = styled.ul`
  padding-bottom: 10px;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'space-between' })};
`;

export const DayItem = styled.li`
  width: 100%;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
  list-style: none;
`;
