import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-bottom: 10px;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'space-between' })};
`;

export const InputTodo = styled.input`
  outline: none;
  box-sizing: border-box;
  width: 80%;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grey1};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const AddButton = styled.button`
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  height: 20px;
  padding: 13px 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  transition: 0.1s ease-in;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })}

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey1};
    color: ${({ theme }) => theme.colors.black};
  }
`;
