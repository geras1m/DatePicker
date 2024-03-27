import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

export const NavigationWrapper = styled.div`
  margin: 0 10px;
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

export const MonthAndYear = styled.div`
  position: relative;
`;

export const HintWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: -25px;
`;

export const Hint = styled.div`
  font-size: 12px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grey1};
  cursor: pointer;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })};

  &:hover ~ p {
    visibility: visible;
  }
`;

export const HintMessage = styled.p`
  visibility: hidden;
  position: absolute;
  top: 12px;
  right: 18px;
  padding: 5px;
  font-size: 12px;
  z-index: 5;
  width: 80px;
  border-radius: 8px 0 8px 8px;
  transition-delay: 0.2s;

  background-color: ${({ theme }) => theme.colors.grey1};
`;
