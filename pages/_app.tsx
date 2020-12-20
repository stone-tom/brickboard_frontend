import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from "styled-components";
import theme from "./../themes";
import GlobalStyle from "../styles/global.styles";
import {AuthProvider} from "../context/auth";

function MyApp({ Component, pageProps }) {
  const currentTheme = "main";

  return (

    <AuthProvider >
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      </AuthProvider>

  );
}

export default MyApp;
