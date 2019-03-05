import { app } from 'firebase-admin';
import mapDBToState from '../data/mapDBtoState';
import { SessionUser } from '../types';

async function fetchProject(client: app.App, user: SessionUser, projectId: string) {
  let data = await client
    .database()
    .ref(`/users/${user.uid}/projects/${projectId}`)
    .once('value');
  let db = data.val();
  return mapDBToState({ projects: { [projectId]: db } }).projects[0];
}

export default fetchProject;
