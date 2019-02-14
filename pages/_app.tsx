import Header from '@self/components/Header';
import Store from '@self/components/Store';
import fetchStore from '@self/lib/services/fetchStore';
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

class Root extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let store = await fetchStore();

    return { pageProps: { ...pageProps, store } };
  }

  render() {
    let { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>React + Next = 💖</title>
        </Head>
        <Store init={pageProps.store}>
          <>
            <Header />
            <Component {...pageProps} />
          </>
        </Store>
      </Container>
    );
  }
}

export default Root;
