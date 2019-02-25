import { DB, FirebaseConfiguration, StoreState } from '@self/lib/types';
import firebase from 'firebase/app';
import 'firebase/database';

try {
  firebase.initializeApp((process.env.firebase as unknown) as FirebaseConfiguration);
} catch {}

async function updateStore(state: StoreState, fn?: () => void): Promise<StoreState> {
  if (state.user) {
    let mappedState = mapStateToDB(state);
    return firebase
      .database()
      .ref(`/users/${state.user.uid}`)
      .set(mappedState, fn);
  } else {
    return state;
  }
}

function mapStateToDB(state: StoreState): DB {
  return {
    settings: state.settings,
    lastUpdated: state.lastUpdated,
  };
}

export default updateStore;
