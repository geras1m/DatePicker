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
  color: #333333ff;
  border-radius: 8px;
  border: 1px solid #dddddd;
  background-color: #ffffffff;
`;

export const CalendarButton = styled.button`
  position: absolute;
  top: 12px;
  left: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 12px;
  right: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
