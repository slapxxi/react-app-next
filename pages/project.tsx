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
import Status from '@self/components/Status';
import useStore from '@self/lib/hooks/useStore';
import redirectTo from '@self/lib/redirectTo';
import {
  Project as IProject,
  ProjectStatus,
  SessionContext,
  Theme,
} from '@self/lib/types';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

interface Props {
  project?: IProject;
  projectId: string;
}

function Project({ projectId }: Props) {
  let { actions, selectors } = useStore();
  let project = selectors.selectProject(projectId);

  function handleDelete() {
    let confirmed = confirm('Delete this project?');

    if (confirmed && project) {
      actions.deleteProject(project);
      Router.push('/projects');
    }
  }

  function handleChangeStatus(status: ProjectStatus) {
    if (project) {
      actions.updateProject({ ...project, status });
    }
  }

  if (project) {
    return (
      <PageContainer>
        <Head>
          <title>MM - Project: {project.title}</title>
        </Head>
        <header>
          <PageHeading
            css={css`
              display: flex;
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
                  <Item>
                    <Link
                      href={`/edit?projectId=${project!.id}`}
                      as={`/edit/${project!.id}`}
                    >
                      <a
                        css={css`
                          text-decoration: none;
                        `}
                      >
                        Edit
                      </a>
                    </Link>
                  </Item>
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
          <Meta project={project} onChangeStatus={handleChangeStatus} />
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

function Meta({
  project,
  onChangeStatus,
}: {
  project: IProject;
  onChangeStatus: (status: ProjectStatus) => void;
}) {
  let itemStyles = css`
    display: flex;
    align-items: center;
    margin-right: 1rem;

    & > span {
      margin-right: 1rem;
    }
  `;

  return (
    <hgroup>
      <ul
        css={css`
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
        `}
      >
        <li css={itemStyles}>
          <span>Status:</span>
          <Status status={project.status} onChangeStatus={onChangeStatus} />
        </li>
        <li css={itemStyles}>
          <span>Created:</span>
          <FormatDate
            date={project.createdAt}
            css={(theme: Theme) => css`
              color: ${theme.color.em};
            `}
          />
        </li>
        <li css={itemStyles}>
          <span>Updated:</span>
          <FormatDate
            date={project.updatedAt}
            css={(theme: Theme) => css`
              color: ${theme.color.em};
            `}
          />{' '}
        </li>
        <li css={itemStyles}>
          <span>Author:</span>
          <Avatar user={project.author} size={24} />
        </li>
      </ul>
    </hgroup>
  );
}

Project.getInitialProps = async ({ res, query }: SessionContext) => {
  let { projectId } = query as Record<string, string>;

  if (res && !projectId) {
    redirectTo(res, '/projects');
  }

  return { projectId };
};

export default withAuth(Project);
