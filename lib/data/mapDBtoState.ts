import map from 'lodash-es/map';
import { BaseStoreState, DB, Project, User } from '../types';

function mapDBToState(db: DB, user: User): BaseStoreState {
  let { projects, settings, lastUpdated } = db;

  return {
    projects: mapDBProjectstoProjects(projects, user),
    settings,
    lastUpdated,
  };
}

function mapDBProjectstoProjects(dbProjects: DB['projects'], user: User): Project[] {
  return map(dbProjects, (project, id) => {
    let { title, description, createdAt, updatedAt, status } = project;

    return {
      id,
      title,
      description,
      status,
      author: user,
      createdAt: new Date(createdAt),
      updatedAt: updatedAt ? new Date(updatedAt) : null,
    };
  });
}

export default mapDBToState;
