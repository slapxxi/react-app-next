import { css } from '@emotion/core';
import { Theme } from '@self/lib/types';

let headings = 'h1,h2,h3,h4,h5,h6';

let sharedStyles = (theme: Theme) => css`
  ::selection {
    background-color: ${theme.color.selection};
  }

  html {
    font-size: 10px;
    background: ${theme.color.background};
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    font-family: ${theme.font.text};
  }

  a {
    :link,
    :visited {
      color: ${theme.color.link};
    }

    :hover,
    :active {
      color: ${theme.color.linkActive};
    }
  }

  ${headings} {
    font-family: ${theme.font.heading};
    color: ${theme.color.heading};
  }

  p {
    line-height: 1.5;
  }
`;

export default sharedStyles;
