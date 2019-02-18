import { DB, FirebaseConfiguration, StoreState } from '@self/lib/types';
import firebase from 'firebase/app';
import 'firebase/database';

try {
  firebase.initializeApp((process.env.firebase as unknown) as FirebaseConfiguration);
} catch {}

async function updateStore(state: StoreState): Promise<StoreState> {
  let mappedState = mapStateToDB(state);
  return firebase
    .database()
    .ref('/')
    .set(mappedState);
}

function mapStateToDB(state: StoreState): DB {
  return {
    items: state.items.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {}),
    settings: state.settings,
  };
}

export default updateStore;
