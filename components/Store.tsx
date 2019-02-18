import updateStore from '@self/lib/services/updateStore';
import { StoreState, UserSettings } from '@self/lib/types';
import debounce from 'lodash-es/debounce';
import { useEffect, useMemo, useReducer } from 'react';
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

let debouncedUpdateStore = debounce(updateStore, 750, { leading: true });

function Store({ children, init }: Props) {
  let [state, dispatch] = useReducer(storeReducer, init);
  let store = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    if (state.lastUpdated !== init.lastUpdated) {
      debouncedUpdateStore(state);
    }
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
