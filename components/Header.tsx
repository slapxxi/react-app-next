/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useStore from '@self/lib/hooks/useStore';
import { Theme } from '@self/lib/types';
import defaultTheme from '@self/styles/defaultTheme';
import styled from '@self/styles/styled';
import Link from 'next/link';
import LogoIcon from './icons/LogoIcon';
import SyncIcon from './icons/SyncIcon';
import { ThemeProvider } from './themeContext';

let headerStyles = css`
  display: flex;
  align-items: center;
  padding: 2rem;
`;

let listStyles = css`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

let listItemStyles = css`
  margin-right: 1em;
`;

let linkStyles = css`
  text-decoration: none;
`;

let StyledLink = styled('a')`
  text-transform: lowercase;
  text-decoration: none;

  :link,
  :visited {
    color: ${({ theme }) => theme.color.text};
  }

  :hover,
  :active {
    color: ${({ theme }) => theme.color.linkActive};
  }
`;

function Header() {
  let { isSyncing } = useStore();
  let iconSize = 20;

  return (
    <ThemeProvider value={{ ...defaultTheme, outline: 'slategrey' }}>
      <header css={headerStyles}>
        <Link href="/">
          <a href="/" css={[linkStyles, { flex: 1 }]}>
            <LogoIcon size={28} />
          </a>
        </Link>
        <nav>
          <ul css={listStyles}>
            <li css={listItemStyles}>
              <Link href="/about">
                <StyledLink href="/about">About</StyledLink>
              </Link>
            </li>
            <li css={listItemStyles}>
              <Link href="/settings">
                <StyledLink href="/settings">Settings</StyledLink>
              </Link>
            </li>
          </ul>
        </nav>
        {isSyncing ? (
          <SyncIcon size={iconSize} />
        ) : (
          <svg
            width={iconSize}
            height={iconSize}
            css={(theme: Theme) => ({
              fill: theme.color.outline,
            })}
          >
            <circle cx="10" cy="10" r="4" />
          </svg>
        )}
      </header>
    </ThemeProvider>
  );
}

export default Header;
