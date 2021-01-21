import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  h2 {
    font-size: 30px;
    font-weight: 400;
    margin: 0 0 30px 0;
  }

  h3 {
    font-size: 22px;
    font-weight: 100;
    margin: 0 0 30px 0;
  }

  h4 {
    font-size: 18px;
    font-weight: 700;
  }

  p {
    font-weight: 300;
  }
`;

export default GlobalStyles;

