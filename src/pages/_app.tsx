import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import Analytics from '../components/Analytics';
import { DataWrapper } from '../contexts/DataContext';
import GlobalStyle from '../GlobalStyles';
import theme from '../theme';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <DataWrapper>
        <GlobalStyle />
        <Analytics />
        <Component {...pageProps} />
      </DataWrapper>
    </ThemeProvider>
  );
};

export default App;
