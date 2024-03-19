import styled from 'styled-components';

interface ICellWrapperProps {
  $isCurrentDay: boolean;
  $isSelectedMonth: boolean;
  $isSelectedDay: boolean;
}

export const CellWrapper = styled.li<ICellWrapperProps>`
  list-style: none;
  width: 100%;
  height: 25px;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $isCurrentDay }) =>
    $isCurrentDay &&
    `
    background-color: #2F80ED; color: #FFFFFFFF;
  `}

  ${({ $isSelectedDay }) => $isSelectedDay && 'border: 1px solid'}

  ${({ $isSelectedMonth }) => $isSelectedMonth && 'color: #AAAAAA'}
`;
