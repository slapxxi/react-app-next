import AppContainer from '@self/components/AppContainer';
import Store from '@self/components/Store';
import fetchStore from '@self/lib/services/fetchStore';
import { StoreState } from '@self/lib/types';
import App, { Container } from 'next/app';
import Head from 'next/head';

class Root extends App {
  static store: StoreState;

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
    let { store, ...componentProps } = pageProps;

    return (
      <Container>
        <Head>
          <title>React + Next = 💖</title>
        </Head>
        <Store init={pageProps.store}>
          <AppContainer>
            <Component {...componentProps} />
          </AppContainer>
        </Store>
      </Container>
    );
  }
}

export default Root;
