import { Global } from '@emotion/core';
import Header from '@self/components/Header';
import Store from '@self/components/Store';
import fetchStore from '@self/lib/services/fetchStore';
import { Store as IStore } from '@self/lib/types';
import globalStyles from '@self/styles/globalStyles';
import App, { Container } from 'next/app';
import Head from 'next/head';

class Root extends App {
  static store: IStore;

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!this.store) {
      this.store = await fetchStore();
    }

    return { pageProps: { ...pageProps, store: this.store } };
  }

  render() {
    let { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>React + Next = 💖</title>
        </Head>

        <Global styles={globalStyles} />

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
