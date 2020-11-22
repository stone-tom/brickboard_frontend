import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from "styled-components";
import theme from "./../themes";
import GlobalStyle from "../styles/global.styles";
import {Provider} from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  const currentTheme = "main";

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      </Provider>
  );
}

export default MyApp;
