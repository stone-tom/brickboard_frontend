import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../themes';
import GlobalStyle from '../styles/global.styles';
import { StoreProvider } from '../context/custom_store';
import Message from '../elements/core/components/Message/Message';
import AppendBody from '../elements/core/components/AppendBody/AppendBody';

function MyApp({
  Component,
  pageProps,
}: any) {
  const currentTheme = 'main';

  return (
    <StoreProvider>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <AppendBody />
        <Message />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>

  );
}

export default MyApp;
