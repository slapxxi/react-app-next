import map from 'lodash-es/map';
import { BaseStoreState, DB, Project } from '../types';

function mapDBToState(db: DB): BaseStoreState {
  let { projects, settings, lastUpdated } = db;

  return {
    projects: mapDBProjectstoProjects(projects),
    settings,
    lastUpdated,
  };
}

function mapDBProjectstoProjects(dbProjects: DB['projects']): Project[] {
  return map(dbProjects, (project, id) => {
    let { title, description, createdAt, updatedAt } = project;

    return {
      id,
      title,
      description,
      createdAt: new Date(createdAt),
      updatedAt: updatedAt ? new Date(updatedAt) : null,
    };
  });
}

export default mapDBToState;
