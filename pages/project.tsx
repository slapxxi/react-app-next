import withAuth from '@self/components/hocs/withAuth';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import fetchProject from '@self/lib/services/fetchProject';
import { Project as IProject, SessionContext } from '@self/lib/types';
import Link from 'next/link';

interface Props {
  project: IProject;
  projectId: string;
}

function Project({ project, projectId }: Props) {
  let { selectors } = useStore();

  if (!project) {
    project = selectors.selectProject(projectId);
  }

  let date;

  if (project && typeof project.createdAt === 'string') {
    date = new Date(project.createdAt);
  } else {
    date = project ? project.createdAt : new Date();
  }

  if (project) {
    return (
      <PageContainer>
        <PageHeading>{project.title}</PageHeading>
        <hgroup>
          <time dateTime={date.toUTCString()}>{date.toString()}</time>
        </hgroup>
        <p>{project.description}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeading>404 - Not Found</PageHeading>
      <p>This project doesn't exist yet</p>
      <Link href="/create">
        <a href="/create">Create Project</a>
      </Link>
    </PageContainer>
  );
}

Project.getInitialProps = async ({ req, query }: SessionContext) => {
  let project;
  let { projectId } = query as Record<string, string>;

  if (req) {
    let user = req.session.decodedToken;

    if (user && projectId) {
      let client = req.firebaseServer;
      project = await fetchProject(client, user, projectId);
    }
  }

  return { project, projectId };
};

export default withAuth(Project);
