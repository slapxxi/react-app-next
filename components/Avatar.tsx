/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme, User } from '@self/lib/types';
import Link from 'next/link';

interface Props extends React.ComponentProps<'div'> {
  user: User;
}

let imgStyles = (theme: Theme) => css`
  width: 36px;
  height: 36px;
  border-radius: 49.9%;
  border: 2px solid ${theme.color.background};

  :hover {
    border-color: ${theme.color.link};
  }
`;

function Avatar({ user }: Props) {
  return (
    <Link href="/settings">
      <a href="/settings">
        <img src={user.picture} alt="User profile picture" css={imgStyles} />
      </a>
    </Link>
  );
}

export { Avatar };
