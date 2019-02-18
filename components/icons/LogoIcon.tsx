/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SVGComponent from '@self/components/hocs/SVGComponent';
import { Theme } from '@self/lib/types';

function LogoIcon() {
  return (
    <g
      css={(theme: Theme) => css`
        fill: ${theme.color.outline};
        stroke: none;
      `}
    >
      <path d="M25.4 36.5v6.4l-9.7-11V8.8L50 49.5 84.3 8.7V32l-9.7 10.9v-6.4L50 64.4l-24.6-28z" />
      <path d="M15.6 62.6l8.5 9.3v2A12 12 0 0 1 0 73.3V17.9L48.9 73a1.5 1.5 0 0 0 2.2 0L100 18V73.3a12 12 0 0 1-24.1.6v-2l8.5-9.3V73c0 1.3 1.4 2.4 3 2.4 1.7 0 3-1.1 3-2.5V45.2L52.2 87a3 3 0 0 1-4.4 0L9.6 45.2V73c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5V62.6z" />
    </g>
  );
}

export default SVGComponent(LogoIcon, {
  viewBox: '0 0 100 100',
  strokeLinecap: 'round',
});
