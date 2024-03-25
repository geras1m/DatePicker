import styled from 'styled-components';

export const ModalWrapper = styled.div`
  padding: 10px 5px 15px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background-color: white;
  height: 100%;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.px14};
  margin-bottom: 5px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 5px;
  cursor: pointer;
  background-color: transparent;
  padding: 4px;
  border: none;
  border-radius: 50%;
`;
