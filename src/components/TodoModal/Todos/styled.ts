import { mixinFlex } from '@components/ThemeProvider/styled';
import styled from 'styled-components';

export const TodosList = styled.ul`
  overflow-y: scroll;
  height: 160px;
  box-sizing: border-box;
  padding: 5px 5px 0 0;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.black};
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const TodosItem = styled.li`
  width: 100%;
  padding-bottom: 3px;
  margin-bottom: 3px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  ${mixinFlex({ alignItem: 'center', justifyContent: 'space-between' })}
`;

export const TodoText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.px14};
  display: inline-block;
  max-width: 75%;
  overflow-wrap: break-word;
`;

export const TodoButton = styled.button`
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  height: 20px;
  padding: 10px 6px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  transition: 0.2s ease-in;

  ${mixinFlex({ alignItem: 'center', justifyContent: 'center' })}

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.black};
  }
`;
