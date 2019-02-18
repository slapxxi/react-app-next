import AppContainer from '@self/components/AppContainer';
import Store from '@self/components/Store';
import fetchStore from '@self/lib/services/fetchStore';
import App, { Container } from 'next/app';
import Head from 'next/head';

class Root extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    let store = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // fetch data on the server or use the store fetching capabilities otherwise
    if (ctx.req) {
      store = await fetchStore();
    }

    return { pageProps: { ...pageProps, store } };
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
