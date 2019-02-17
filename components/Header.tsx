/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import defaultTheme from '@self/styles/defaultTheme';
import Link from 'next/link';
import InboxIcon from './icons/InboxIcon';
import { ThemeProvider } from './themeContext';

let containerStyles = css`
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
  let iconSize = 20;

  return (
    <ThemeProvider value={{ ...defaultTheme, outline: 'slategrey' }}>
      <header>
        <nav>
          <ul css={containerStyles}>
            <li css={listItemStyles}>
              <Link href="/">
                <a>
                  <InboxIcon size={iconSize} />
                </a>
              </Link>
            </li>
            <li css={listItemStyles}>
              <Link href="/about" prefetch>
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
      </header>
    </ThemeProvider>
  );
}

export default Header;
