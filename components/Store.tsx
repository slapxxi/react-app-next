import fetchStore from '@self/lib/services/fetchStore';
import updateStore from '@self/lib/services/updateStore';
import {
  Action,
  ID,
  PayloadAction,
  Project,
  StoreState,
  User,
  UserCreatedProject,
  UserSettings,
} from '@self/lib/types';
import debounce from 'lodash-es/debounce';
import findIndex from 'lodash-es/findIndex';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { Provider } from './storeContext';

export enum ActionType {
  updateSettings = 'UPDATE_SETTINGS',
  createProject = 'CREATE_PROJECT',
  updateProject = 'UPDATE_PROJECT',
  deleteProject = 'DELETE_PROJECT',
  deleteProjects = 'DELETE_PROJECTS',
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
  | PayloadAction<ActionType.updateProject, Project>
  | PayloadAction<ActionType.deleteProject, Project>
  | PayloadAction<ActionType.deleteProjects, ID[]>
  | Action<ActionType.signOut>;

interface Props {
  children: React.ReactChild;
  init: StoreState;
}

let defaultState: StoreState = {
  user: null,
  projects: [],
  settings: { useDarkMode: false, reduceMotion: false },
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
    case ActionType.deleteProjects:
      return {
        ...state,
        projects: state.projects.filter((p) => !action.payload.includes(p.id)),
        lastUpdated: Date.now(),
      };
    case ActionType.updateProject:
      // TODO: replace with immutable implementation
      let index = findIndex(state.projects, (p) => p.id === action.payload.id);
      state.projects.splice(index, 1, { ...action.payload, updatedAt: new Date() });
      return state;
    case ActionType.createProject:
      if (state.user) {
        let userCreatedProject = action.payload;
        return {
          ...state,
          projects: [
            ...state.projects,
            {
              ...userCreatedProject,
              author: state.user,
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
