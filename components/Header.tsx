/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useStore from '@self/lib/hooks/useStore';
import defaultTheme from '@self/styles/defaultTheme';
import Link from 'next/link';
import LogoIcon from './icons/LogoIcon';
import SyncIcon from './icons/SyncIcon';
import { ThemeProvider } from './themeContext';

let headerStyles = css`
  display: flex;
  padding: 1rem;
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

function Header() {
  let { isSyncing } = useStore();
  let iconSize = 20;

  return (
    <ThemeProvider value={{ ...defaultTheme, outline: 'slategrey' }}>
      <header css={headerStyles}>
        <nav css={{ flex: 1 }}>
          <ul css={listStyles}>
            <li css={listItemStyles}>
              <Link href="/">
                <a>
                  <LogoIcon size={28} />
                </a>
              </Link>
            </li>
            <li css={listItemStyles}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li css={listItemStyles}>
              <Link href="/settings">
                <a>Settings</a>
              </Link>
            </li>
          </ul>
        </nav>
        {isSyncing ? (
          <div>
            <SyncIcon size={iconSize} />
          </div>
        ) : null}
      </header>
    </ThemeProvider>
  );
}

export default Header;
