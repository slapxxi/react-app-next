import { css } from '@emotion/core';

let globalStyles = css`
  body {
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

export default globalStyles;
