import { ActionType } from '@self/components/Store';
import storeContext from '@self/components/storeContext';
import { useContext } from 'react';
import { Store } from '../types';

function useStore() {
  let { state, dispatch, isSyncing } = useContext(storeContext);
  return {
    state,
    isSyncing,
    actions: {
      updateSettings(settings: keyof Store) {
        return dispatch({ type: ActionType.updateSettings, payload: settings });
      },
    },
  };
}

export default useStore;
