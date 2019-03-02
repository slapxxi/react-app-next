/** @jsx jsx */
import { jsx } from '@emotion/core';
import GithubButton from '@self/components/GithubButton';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import signIn from '@self/lib/services/signIn';
import signOut from '@self/lib/services/signOut';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useEffect } from 'react';

let provider = new firebase.auth.GithubAuthProvider();

function Login() {
  let { state, actions } = useStore();

  useEffect(() => {
    let unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        signIn(user).then((user) => actions.signIn(user));
      } else {
        signOut().then(() => actions.signOut());
      }
    });
    return unsub;
  }, []);

  function handleSignIn() {
    firebase.auth().signInWithPopup(provider);
  }

  function handleSignOut() {
    firebase.auth().signOut();
  }

  if (state.user) {
    return (
      <PageContainer>
        <PageHeading>Sign Out</PageHeading>
        <button onClick={handleSignOut}>Sign Out</button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeading>Sign In</PageHeading>
      <GithubButton onClick={handleSignIn} />
    </PageContainer>
  );
}

Login.getInitialProps = async ({ req, res }: any) => {
  let user = req && req.session ? req.session.decodedToken : null;
  if (res && user) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  return { user };
};

export default Login;
