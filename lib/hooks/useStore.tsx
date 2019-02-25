import { ActionType } from '@self/components/Store';
import storeContext from '@self/components/storeContext';
import { useContext } from 'react';
import { Maybe, StoreState, User } from '../types';

function useStore() {
  let { state, dispatch, isSyncing } = useContext(storeContext);
  return {
    state,
    isSyncing,
    actions: {
      updateSettings(settings: StoreState['settings']) {
        return dispatch({ type: ActionType.updateSettings, payload: settings });
      },
      signIn(user: Maybe<User>) {
        return dispatch({ type: ActionType.signIn, payload: user });
      },
      signOut() {
        return dispatch({ type: ActionType.signOut });
      },
    },
  };
}

export default useStore;
