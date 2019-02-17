import { ActionType } from '@self/components/Store';
import storeContext from '@self/components/storeContext';
import { useContext } from 'react';
import { Store } from '../types';

function useStore() {
  let { state, dispatch } = useContext(storeContext);
  return {
    state,
    actions: {
      updateSettings(settings: keyof Store) {
        return dispatch({ type: ActionType.updateSettings, payload: settings });
      },
    },
  };
}

export default useStore;
