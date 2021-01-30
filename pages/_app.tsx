import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../themes';
import GlobalStyle from '../styles/global.styles';
import { AuthProvider } from '../context/auth';
import Message from '../elements/core/components/Message/Message';

function MyApp({ Component, pageProps }) {
  const currentTheme = 'main';

  return (

    <AuthProvider>
      <ThemeProvider theme={theme[currentTheme]}>
        <GlobalStyle />
        <Message />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>

  );
}

export default MyApp;
