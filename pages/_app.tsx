import App, { Container } from 'next/app';
import React from 'react';

class Root extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    let { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default Root;
