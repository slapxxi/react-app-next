import fetchStore from '@self/lib/services/fetchStore';
import updateStore from '@self/lib/services/updateStore';
import { StoreState, User, UserSettings } from '@self/lib/types';
import debounce from 'lodash-es/debounce';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { Provider } from './storeContext';

export enum ActionType {
  updateSettings = 'UPDATE_SETTINGS',
  setUser = 'SET_USER',
  signIn = 'SIGN_IN',
  signOut = 'SIGN_OUT',
  setUserData = 'SET_USER_DATA',
}

interface Action<Type, Payload> {
  type: Type;
  payload: Payload;
}

type StoreAction =
  | Action<ActionType.updateSettings, UserSettings>
  | Action<ActionType.setUser, User>
  | Action<ActionType.setUserData, StoreState>
  | Action<ActionType.signIn, User>
  | Action<ActionType.signOut, void>;

interface Props {
  children: React.ReactChild;
  init: StoreState;
}

let defaultState: StoreState = {
  user: null,
  settings: { useDarkMode: false },
  lastUpdated: 0,
};

let debouncedUpdateStore = debounce(updateStore, 500);

function Store({ children, init }: Props) {
  let [state, dispatch] = useReducer(storeReducer, init);
  let [isSyncing, setIsSyncing] = useState(false);
  let store = useMemo(() => ({ state, dispatch, isSyncing }), [state, isSyncing]);

  useEffect(() => {
    if (state.user && state.lastUpdated !== init.lastUpdated) {
      setIsSyncing(() => true);
      debouncedUpdateStore(state, () => setIsSyncing(false));
    }
    return () => debouncedUpdateStore.cancel();
  }, [state]);

  useEffect(() => {
    if (state.user) {
      // hydrate store with the user's data
      fetchStore(state.user).then((data) =>
        dispatch({ type: ActionType.setUserData, payload: data }),
      );
    }
  }, [state.user]);

  return <Provider value={store}>{children}</Provider>;
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case ActionType.setUserData:
      return action.payload;
    case ActionType.updateSettings:
      return { ...state, settings: action.payload, lastUpdated: Date.now() };
    case ActionType.signIn:
      return { ...state, user: action.payload };
    case ActionType.signOut:
      return { ...defaultState };
    default:
      return state;
  }
}

export default Store;
