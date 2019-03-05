import { ActionType } from '@self/components/Store';
import storeContext from '@self/components/storeContext';
import { useContext } from 'react';
import { ID, Maybe, Project, StoreState, User, UserCreatedProject } from '../types';

function useStore() {
  let { state, dispatch, isSyncing } = useContext(storeContext);
  return {
    state,
    isSyncing,
    selectors: {
      selectProject(id: ID) {
        return state.projects.find((p: Project) => p.id === id);
      },
    },
    actions: {
      createProject(project: UserCreatedProject) {
        return dispatch({ type: ActionType.createProject, payload: project });
      },
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
