import { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheetDocument } from 'next-sanity/studio';

export default class Document extends ServerStyleSheetDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
