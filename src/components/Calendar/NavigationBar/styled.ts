import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

export const NavigationWrapper = styled.div`
  padding-bottom: 20px;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'space-between' })};
`;

export const NavButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })};
`;

export const MonthAndYear = styled.p``;
