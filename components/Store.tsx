import updateStore from '@self/lib/services/updateStore';
import { StoreState, UserSettings } from '@self/lib/types';
import debounce from 'lodash-es/debounce';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { Provider } from './storeContext';

export enum ActionType {
  updateSettings = 'UPDATE_SETTINGS',
}

interface Action<Type, Payload> {
  type: Type;
  payload: Payload;
}

type StoreAction = Action<ActionType.updateSettings, UserSettings>;

interface Props {
  children: React.ReactChild;
  init: StoreState;
}

let debouncedUpdateStore = debounce(updateStore, 500);

function Store({ children, init }: Props) {
  let [state, dispatch] = useReducer(storeReducer, init);
  let [isSyncing, setIsSyncing] = useState(false);
  let store = useMemo(() => ({ state, dispatch, isSyncing }), [state, isSyncing]);

  useEffect(() => {
    if (state.lastUpdated !== init.lastUpdated) {
      setIsSyncing(() => true);
      debouncedUpdateStore(state, () => setIsSyncing(false));
    }
    return () => debouncedUpdateStore.cancel();
  }, [state]);

  return <Provider value={store}>{children}</Provider>;
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case ActionType.updateSettings:
      return { ...state, settings: action.payload, lastUpdated: Date.now() };
    default:
      return state;
  }
}

export default Store;
