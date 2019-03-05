import { DB, FirebaseConfiguration, Project, StoreState } from '@self/lib/types';
import firebase from 'firebase/app';
import 'firebase/database';
import reduce from 'lodash-es/reduce';

try {
  firebase.initializeApp((process.env.firebase as unknown) as FirebaseConfiguration);
} catch {}

async function updateStore(state: StoreState, fn?: () => void): Promise<StoreState> {
  if (state.user) {
    let mappedState = mapStateToDB(state);
    return firebase
      .database()
      .ref(`/users/${state.user.uid}`)
      .set(mappedState, fn);
  } else {
    return state;
  }
}

function mapStateToDB(state: StoreState): DB {
  return {
    projects: mapProjectsToDBProjects(state.projects),
    settings: state.settings,
    lastUpdated: state.lastUpdated,
  };
}

function mapProjectsToDBProjects(projects: Project[]): DB['projects'] {
  return reduce(
    projects,
    (acc, project) => {
      return {
        ...acc,
        [project.id]: {
          title: project.title,
          description: project.description,
          createdAt: project.createdAt.getTime(),
          updatedAt: null,
        },
      };
    },
    {},
  );
}

export default updateStore;
