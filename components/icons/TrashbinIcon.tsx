/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SVGComponent from '@self/components/hocs/SVGComponent';
import { Theme } from '@self/lib/types';

function TrashbinIcon({ className }: any) {
  return (
    <g
      css={(theme: Theme) => css`
        fill: none;
        stroke: ${theme.color.outline};
        stroke-width: 8px;
      `}
      className={className}
    >
      <path d="M78.966 30.46H21.122s-.064 47.728-.083 62.034c-.001 1.062.42 2.08 1.17 2.832.75.751 1.768 1.173 2.83 1.173h49.844c2.207 0 3.997-1.787 4-3.994.019-14.293.083-62.045.083-62.045z" />
      <path d="M83.463 30.46H16.639s-.043-6.121-.073-10.386c-.008-1.065.41-2.09 1.161-2.846.751-.756 1.773-1.182 2.839-1.182h58.823c2.198 0 3.984 1.774 4 3.972.03 4.267.074 10.442.074 10.442zM69.472 16.046s.028-5.802.045-9.514c.004-.803-.312-1.574-.878-2.143-.566-.568-1.336-.888-2.138-.888H33.618c-1.66 0-3.009 1.342-3.017 3.002-.017 3.712-.045 9.543-.045 9.543" />
      <path
        d="M36.045 42.557v41.846M50 42.557v41.846M63.955 42.557v41.846"
        strokeLinecap="butt"
      />
    </g>
  );
}

export default SVGComponent(TrashbinIcon, {
  viewBox: '0 0 100 100',
  fillRule: 'evenodd',
});
