/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Dropdown from '@self/components/Dropdown';
import CogIcon from '@self/components/icons/CogIcon';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import { Project, Theme } from '@self/lib/types';
import sortBy from 'lodash-es/sortBy';
import Head from 'next/head';
import Link from 'next/link';

function Projects() {
  let { selectors } = useStore();
  let projects = sortBy(selectors.selectProjects(), ['createdAt', 'title']);

  return (
    <PageContainer>
      <Head>
        <title>MM - Projects</title>
      </Head>
      <PageHeading
        css={css`
          display: flex;
        `}
      >
        Projects
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
          {({ Item, setActive }) => (
            <>
              <Item onClick={() => setActive(false)}>Edit</Item>
            </>
          )}
        </Dropdown>
      </PageHeading>
      <Link href="/create">
        <a>Create Project</a>
      </Link>
      {projects.length === 0 ? (
        <p>There are no projects yet.</p>
      ) : (
        <ul>
          {projects.map((p: Project) => (
            <li key={p.id}>
              <Link href={`/project?projectId=${p.id}`} as={`/project/${p.id}`}>
                <a>{p.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}

export default Projects;
