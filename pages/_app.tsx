import AppContainer from '@self/components/AppContainer';
import Store from '@self/components/Store';
import fetchStore from '@self/lib/services/fetchStore';
import App, { Container, NextAppContext } from 'next/app';
import Head from 'next/head';

class Root extends App {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};
    let { req } = ctx;
    let user = req && req.session ? req.session.decodedToken : null;
    let store;

    if (user) {
      store = await fetchStore(user, req.firebaseServer);
    } else {
      store = await fetchStore(null);
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps: { ...pageProps, store } };
  }

  public render() {
    let { Component, pageProps } = this.props;
    let { store, ...componentProps } = pageProps;

    return (
      <Container>
        <Head>
          <title>React + Next = 💖</title>
        </Head>
        <Store init={store}>
          <AppContainer>
            <Component {...componentProps} />
          </AppContainer>
        </Store>
      </Container>
    );
  }
}

export default Root;
