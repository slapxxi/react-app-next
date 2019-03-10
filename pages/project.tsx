/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Avatar } from '@self/components/Avatar';
import Dropdown from '@self/components/Dropdown';
import FormatDate from '@self/components/FormatDate';
import withAuth from '@self/components/hocs/withAuth';
import CogIcon from '@self/components/icons/CogIcon';
import TrashbinIcon from '@self/components/icons/TrashbinIcon';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import fetchProject from '@self/lib/services/fetchProject';
import { Project as IProject, SessionContext, Theme } from '@self/lib/types';
import Link from 'next/link';
import Router from 'next/router';

interface Props {
  project: IProject;
  projectId: string;
}

function Project({ project, projectId }: Props) {
  let { actions, selectors } = useStore();

  if (!project) {
    project = selectors.selectProject(projectId);
  }

  function handleDelete() {
    let confirmed = confirm('Delete this project?');
    if (confirmed) {
      actions.deleteProject(project);
      Router.push('/projects');
    }
  }

  if (project) {
    return (
      <PageContainer>
        <header>
          <PageHeading
            css={css`
              display: flex;
              margin: 0;
            `}
          >
            {project.title}
            <Dropdown
              css={css`
                margin-left: 1rem;
              `}
              renderToggle={({ active }) => (
                <CogIcon
                  size={20}
                  css={(theme: Theme) => css`
                    ${active && `stroke: ${theme.color.em};`}
                  `}
                />
              )}
            >
              {({ Item }) => (
                <>
                  <Item>Edit</Item>
                  <Item>Remind</Item>
                  <Item onClick={handleDelete}>
                    <TrashbinIcon
                      size={16}
                      css={css`
                        margin-right: 0.5rem;
                      `}
                    />
                    Delete
                  </Item>
                </>
              )}
            </Dropdown>
          </PageHeading>
          <hgroup
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            Created:{' '}
            <FormatDate
              date={project.createdAt}
              css={(theme: Theme) => css`
                color: ${theme.color.em};
              `}
            />{' '}
            Updated:{' '}
            <FormatDate
              date={project.updatedAt}
              css={(theme: Theme) => css`
                color: ${theme.color.em};
              `}
            />{' '}
            Author: <Avatar user={project.author} size={24} />
          </hgroup>
        </header>
        <p>{project.description}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeading>404 - Not Found</PageHeading>
      <p>This project doesn&#39;t exist yet</p>
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
