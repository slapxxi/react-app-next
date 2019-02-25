/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Button from './Button';
import GithubIcon from './icons/GithubIcon';

type Props = React.ComponentProps<'button'>;

function GithubButton(props: Props) {
  return (
    <Button
      css={(theme) =>
        css`
          background: ${theme.color.text};
          color: ${theme.color.background};

          :hover {
            background: #000;
          }
        `
      }
      {...props}
    >
      <GithubIcon
        size={24}
        css={(theme) =>
          css`
            margin-right: 1rem;
            fill: ${theme.color.background};
          `
        }
      />
      Sign In with Github
    </Button>
  );
}

export default GithubButton;
