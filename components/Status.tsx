/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ProjectStatus, Theme } from '@self/lib/types';
import { ComponentProps } from 'react';
import Dropdown from './Dropdown';

interface Props extends ComponentProps<'span'> {
  status: ProjectStatus;
  onChangeStatus: (status: ProjectStatus) => void;
}

let styles = (status: ProjectStatus) => (theme: Theme) => css`
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8em;
  color: ${theme.type === 'light' ? theme.color.text : theme.color.background};

  ${matchStyles(status)}
`;

function Status({ status, onChangeStatus, ...rest }: Props) {
  if (onChangeStatus) {
    return (
      <Dropdown
        renderToggle={() => (
          <span data-interactive={true} css={styles(status)} {...rest}>
            {renderText(status)}
          </span>
        )}
      >
        {({ Item, setActive }) => (
          <>
            <Item
              onClick={() => {
                onChangeStatus(ProjectStatus.active);
                setActive(false);
              }}
            >
              Active
            </Item>
            <Item
              onClick={() => {
                onChangeStatus(ProjectStatus.finished);
                setActive(false);
              }}
            >
              Finished
            </Item>
            <Item
              onClick={() => {
                onChangeStatus(ProjectStatus.pending);
                setActive(false);
              }}
            >
              Pending
            </Item>
          </>
        )}
      </Dropdown>
    );
  }
  return (
    <span css={styles(status)} {...rest}>
      {renderText(status)}
    </span>
  );
}

function matchStyles(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.active:
      return css`
        background: gold;

        &[data-interactive]:hover {
          background: yellow;
        }
      `;
    case ProjectStatus.finished:
      return css`
        background: greenyellow;

        &[data-interactive]:hover {
          background: yellowgreen;
        }
      `;
    case ProjectStatus.pending:
      return css`
        background: aquamarine;

        &[data-interactive]:hover {
          background: cyan;
        }
      `;
    default:
      return css`
        background: lightgrey;

        &[data-interactive]:hover {
          background: grey;
        }
      `;
  }
}

function renderText(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.active:
      return 'Active';
    case ProjectStatus.finished:
      return 'Finished';
    case ProjectStatus.pending:
      return 'Pending';
    default:
      return 'N/A';
  }
}

export default Status;
