/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme, User } from '@self/lib/types';
import Link from 'next/link';

interface Props extends React.ComponentProps<'div'> {
  user: User;
}

let imgStyles = (theme: Theme) => css`
  width: 40px;
  height: 40px;
  border-radius: 49.9%;
  border: 2px solid ${theme.color.background};

  :hover {
    border-color: ${theme.color.linkActive};
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
