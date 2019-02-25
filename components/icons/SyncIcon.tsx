/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SVGComponent from '@self/components/hocs/SVGComponent';
import { Theme } from '@self/lib/types';

function SyncIcon() {
  return (
    <g
      css={(theme: Theme) => css`
        fill: none;
        stroke: ${theme.color.outline};
      `}
    >
      <path
        d="M69.7 66H76a20.6 20.6 0 0 0 10.2-38.8v-1.7A22 22 0 0 0 47 12.1a22 22 0 0 0-22 12.5A20.8 20.8 0 0 0 3.3 45.3c0 10.6 8 19.3 18.2 20.6h13.2"
        strokeWidth="8"
      />
      <path d="M52.2 66V25M52.2 25L42 35.3M52.2 25l10.4 10.3" strokeWidth="6" />
    </g>
  );
}

export default SVGComponent(SyncIcon, {
  viewBox: '0 0 100 70',
  strokeLinecap: 'round',
});
