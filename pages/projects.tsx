/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Avatar } from '@self/components/Avatar';
import Dropdown from '@self/components/Dropdown';
import CogIcon from '@self/components/icons/CogIcon';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import Status from '@self/components/Status';
import useStore from '@self/lib/hooks/useStore';
import { ID, Project, Theme } from '@self/lib/types';
import isEmpty from 'lodash-es/isEmpty';
import sortBy from 'lodash-es/sortBy';
import uniq from 'lodash-es/uniq';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type InputEvent = ChangeEvent<HTMLInputElement>;

function Projects() {
  let { selectors, actions } = useStore();
  let projects = sortBy(selectors.selectProjects(), ['createdAt', 'title']);
  let [editing, setEditing] = useState(false);
  let [selected, setSelected] = useState<ID[]>([]);

  function selectProject(event: InputEvent, id: ID) {
    if (event.target.checked) {
      setSelected((list) => uniq([...list, id]));
    } else {
      setSelected((list) => list.filter((pid) => pid !== id));
    }
  }

  function handleDelete() {
    if (confirm('Sure you want to delete selected projects?')) {
      actions.deleteProjects(selected);
      setEditing(false);
    }
  }

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
          {({ Item, setActive }) =>
            editing ? (
              <>
                {isEmpty(selected) ? null : (
                  <Item
                    onClick={() => {
                      setActive(false);
                      handleDelete();
                    }}
                  >
                    Delete
                  </Item>
                )}
                <Item
                  onClick={() => {
                    setActive(false);
                    setEditing(false);
                    setSelected([]);
                  }}
                >
                  Cancel
                </Item>
              </>
            ) : (
              <>
                <Item
                  onClick={() => {
                    setActive(false);
                    setEditing(true);
                  }}
                >
                  Edit
                </Item>
              </>
            )
          }
        </Dropdown>
      </PageHeading>
      <Link href="/create">
        <a>Create Project</a>
      </Link>
      {projects.length === 0 ? (
        <p>There are no projects yet.</p>
      ) : (
        <ul
          css={css`
            padding: 0;
            margin: 1rem;
          `}
        >
          {projects.map((p: Project) => (
            <li
              key={p.id}
              css={css`
                display: flex;
                align-items: center;
                padding: 1rem 0;
              `}
            >
              <Status
                status={p.status}
                css={css`
                  margin-right: 1rem;
                `}
              />
              {editing && (
                <input
                  type="checkbox"
                  onChange={(e) => selectProject(e, p.id)}
                  checked={selected.includes(p.id)}
                />
              )}
              <Link href={`/project?projectId=${p.id}`} as={`/project/${p.id}`}>
                <a>{p.title}</a>
              </Link>
              <Avatar
                user={p.author}
                size={20}
                css={css`
                  margin-left: 1rem;
                `}
              />
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}

export default Projects;
