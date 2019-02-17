import { css } from '@emotion/core';
import darkTheme from './darkTheme';

let defaultStyles = css`
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: Arial, sans-serif;
  }

  a {
    color: slateblue;

    :hover {
      color: slategray;
    }
  }
`;

let darkModeStyles = css`
  html {
    background: ${darkTheme.background};
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: Arial, sans-serif;
  }

  a {
    color: slateblue;

    :hover {
      color: slategray;
    }
  }
`;

function globalStyles(useDarkMode: boolean) {
  return useDarkMode ? darkModeStyles : defaultStyles;
}
export default globalStyles;