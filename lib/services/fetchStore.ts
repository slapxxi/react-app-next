import { DB, FirebaseConfiguration, Maybe, StoreState, User } from '@self/lib/types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

try {
  firebase.initializeApp((process.env.firebase as unknown) as FirebaseConfiguration);
} catch {}

let defaultStoreState: StoreState = {
  user: null,
  settings: { useDarkMode: false },
  lastUpdated: 0,
};

async function fetchStore(user: Maybe<User>, client = firebase): Promise<StoreState> {
  if (user) {
    return client
      .database()
      .ref(`/users/${user.uid}`)
      .once('value')
      .then((snapshot) => {
        let data: DB = snapshot.val();
        return { ...data, user };
      });
  } else {
    return defaultStoreState;
  }
}

export default fetchStore;
