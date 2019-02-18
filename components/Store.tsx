import updateStore from '@self/lib/services/updateStore';
import { StoreState, UserSettings } from '@self/lib/types';
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

function Store({ children, init }: Props) {
  let [state, dispatch] = useReducer(storeReducer, init);
  let value = useMemo(() => ({ state, dispatch }), [state]);

  useEffect(() => {
    updateStore(state);
  }, [state]);

  return <Provider value={value}>{children}</Provider>;
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case ActionType.updateSettings:
      return { ...state, settings: action.payload };
    default:
      return state;
  }
}

export default Store;
