import styled from 'styled-components';

export const WrapperCalendar = styled.div`
  width: 250px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
`;

export const DaysList = styled.ul`
  display: grid;
  padding: 0;
  justify-content: space-between;
  justify-items: center;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
`;
