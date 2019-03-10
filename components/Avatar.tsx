/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Theme, User } from '@self/lib/types';
import Link from 'next/link';

interface Props extends React.ComponentProps<'div'> {
  user: User;
  size?: number;
}

let imgStyles = (size: number) => (theme: Theme) => css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 49.9%;
  border: 2px solid ${theme.color.background};

  :hover {
    border-color: ${theme.color.link};
  }
`;

function Avatar({ user, size = 32 }: Props) {
  if (!user) {
    throw new Error('There is no user!');
  }

  return (
    <Link href="/settings">
      <a href="/settings">
        <img src={user.picture} alt="User profile picture" css={imgStyles(size)} />
      </a>
    </Link>
  );
}

export { Avatar };
