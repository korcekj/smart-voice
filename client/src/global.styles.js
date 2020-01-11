import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Lato', sans-serif;
    background-color: #fff;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
