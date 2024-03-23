import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    padding: 0;
    margin: 0;
  }

  a {
      text-decoration: none;
  }

  ul,
  ol,
  li {
      list-style: none;
  }
`;

export const mixinFlex = ({ alignItem = 'start', justifyContent = 'flex-start' }) => css`
  display: flex;
  align-items: ${alignItem};
  justify-content: ${justifyContent};
`;

export default GlobalStyles;
