import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const DateRangeInputWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.px14};
  box-sizing: border-box;
  max-width: 250px;
`;

export const ClearRangeButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 600;
  background-color: white;
  border-top: 1px solid black;
  transition: 0.1s ease-in;

  &:hover {
    background-color: blue;
    color: white;
  }
`;
