import fetchStore from '@self/lib/services/fetchStore';
import updateStore from '@self/lib/services/updateStore';
import {
  Action,
  PayloadAction,
  Project,
  StoreState,
  User,
  UserCreatedProject,
  UserSettings,
} from '@self/lib/types';
import debounce from 'lodash-es/debounce';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { Provider } from './storeContext';

export enum ActionType {
  updateSettings = 'UPDATE_SETTINGS',
  createProject = 'CREATE_PROJECT',
  deleteProject = 'DELETE_PROJECT',
  setUser = 'SET_USER',
  signIn = 'SIGN_IN',
  signOut = 'SIGN_OUT',
  setUserData = 'SET_USER_DATA',
}

type StoreAction =
  | PayloadAction<ActionType.updateSettings, UserSettings>
  | PayloadAction<ActionType.setUser, User>
  | PayloadAction<ActionType.setUserData, StoreState>
  | PayloadAction<ActionType.signIn, User>
  | PayloadAction<ActionType.createProject, UserCreatedProject>
  | PayloadAction<ActionType.deleteProject, Project>
  | Action<ActionType.signOut>;

interface Props {
  children: React.ReactChild;
  init: StoreState;
}

let defaultState: StoreState = {
  user: null,
  projects: [],
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
    case ActionType.deleteProject:
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload.id),
        lastUpdated: Date.now(),
      };
    case ActionType.createProject:
      if (state.user) {
        let userCreatedProject = action.payload;
        return {
          ...state,
          projects: [
            ...state.projects,
            {
              ...userCreatedProject,
              createdAt: new Date(),
              updatedAt: null,
            },
          ],
          lastUpdated: Date.now(),
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default Store;
