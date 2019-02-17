import { DB, FirebaseConfiguration, StoreState } from '@self/lib/types';
import firebase from 'firebase/app';
import 'firebase/database';
import map from 'lodash-es/map';

try {
  firebase.initializeApp((process.env.firebase as unknown) as FirebaseConfiguration);
} catch {}

async function fetchStore(): Promise<StoreState> {
  return firebase
    .database()
    .ref('/')
    .once('value')
    .then((snapshot) => {
      let data: DB = snapshot.val();
      return { ...data, items: map(data.items, (item, key) => ({ ...item, id: key })) };
    });
}

export default fetchStore;
