import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import theme from "./../themes";
import GlobalStyle from "../styles/global.styles";

function MyApp({ Component, pageProps }) {
  const currentTheme = "main";

  return (
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
  );
}

export default MyApp;
