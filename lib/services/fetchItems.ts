import { FirebaseConfiguration } from '@self/lib/types';
import firebase from 'firebase/app';
import 'firebase/database';
import map from 'lodash-es/map';

try {
  firebase.initializeApp((process.env.firebase as unknown) as FirebaseConfiguration);
} catch {}

async function fetchItems() {
  return firebase
    .database()
    .ref('/items')
    .once('value')
    .then((snapshot) =>
      map(snapshot.val(), (value, key) => ({
        id: key,
        ...value,
      })),
    );
}

export default fetchItems;
