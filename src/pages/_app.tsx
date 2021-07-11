import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';

import Analytics from '../components/Analytics';
import { DataWrapper } from '../contexts/DataContext';
import { ThemeContext } from '../contexts/ThemeContext';
import GlobalStyle from '../GlobalStyles';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <ThemeContext>
      <DataWrapper>
        <GlobalStyle />
        <Analytics />
        <Component {...pageProps} />
      </DataWrapper>
    </ThemeContext>
  );
};

export default App;
