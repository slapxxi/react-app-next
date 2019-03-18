import { ActionType } from '@self/components/Store';
import storeContext from '@self/components/storeContext';
import { useContext, useMemo } from 'react';
import { ID, Maybe, Project, StoreState, User, UserCreatedProject } from '../types';

function useStore() {
  let { state, dispatch, isSyncing } = useContext(storeContext);

  let actions = useMemo(() => {
    return {
      createProject(project: UserCreatedProject) {
        return dispatch({ type: ActionType.createProject, payload: project });
      },
      deleteProject(project: Project) {
        return dispatch({ type: ActionType.deleteProject, payload: project });
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
    };
  }, [dispatch]);

  let selectors = useMemo(() => {
    return {
      selectProjects() {
        return state.projects;
      },
      selectProject(id: ID) {
        return state.projects.find((p: Project) => p.id === id);
      },
    };
  }, [state]);

  return {
    state,
    isSyncing,
    selectors,
    actions,
  };
}

export default useStore;
