import Document, { Head, Main, NextScript } from 'next/document';

class RootDocument extends Document {
  static async getInitialProps(ctx: any) {
    let initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style>{`body { margin: 0; font-size: 16px; font-family: sans-serif; }`}</style>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0A0A15" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default RootDocument;
