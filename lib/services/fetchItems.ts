import firebase from 'firebase/app';
import 'firebase/database';
import map from 'lodash-es/map';
import getConfig from 'next/config';

let { publicRuntimeConfig } = getConfig();

try {
  firebase.initializeApp(publicRuntimeConfig.firebase);
} catch (e) {}

async function fetchItems() {
  return firebase
    .database()
    .ref('/')
    .once('value')
    .then((snapshot) =>
      map(snapshot.val().items, (value, key) => ({
        id: key,
        ...value,
      })),
    );
}

export default fetchItems;
