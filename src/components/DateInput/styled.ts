import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  max-width: 250px;
`;

export const Input = styled.input`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 12px 40px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CalendarButton = styled.button`
  position: absolute;
  top: 12px;
  left: 11px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })};
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 12px;
  right: 9px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })};
`;

export const ErrorText = styled.p`
  max-width: 250px;
  font-size: ${({ theme }) => theme.fontSizes.px14};
  text-align: center;
  color: red;
  margin: 0;
`;
