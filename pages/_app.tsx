import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../themes';
import GlobalStyle from '../styles/global.styles';
import { StoreProvider } from '../context/custom_store';
import Message from '../elements/core/components/Message/Message';

function MyApp({
  Component,
  pageProps,
}: any) {
  const currentTheme = 'main';

  return (
    <StoreProvider>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Message />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>

  );
}

export default MyApp;
