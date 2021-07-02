import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

//@ts-ignore
export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    const { renderPage } = ctx;

    const sheet = new ServerStyleSheet();
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        {
          <Head>
            {/*@ts-ignore*/}
            {this.props.styleTags}

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content="black"
            />

            <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
            <link rel="icon" type="image/png" href="/images/favicon.png" />
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
              rel="stylesheet"
            />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/images/logo192.png" />
          </Head>
        }
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
