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
      <path d="M14.357 49.532l7.138 6.911a2 2 0 0 1 .609 1.437v33.581h-7.747V49.532zM85.705 49.532l-7.138 6.911a2 2 0 0 0-.609 1.437v33.581h7.747V49.532z" />
      <path d="M0 11.918l54.054 53.82a1 1 0 0 1-.705 1.709h-7.705a2.003 2.003 0 0 1-1.415-.586L7.747 30.378v61.083H0V11.918zM93.329 8.713l-9.934-.161a2.003 2.003 0 0 0-1.446.586L56.431 34.656a2 2 0 0 0 0 2.828l2.649 2.649a2 2 0 0 0 2.828 0l31.421-31.42z" />
      <path d="M59.281 50.21a2 2 0 0 0 2.824.004L100 12.521v78.94h-7.747V30.964L62.811 60.406a3 3 0 0 1-4.241.001L6.654 8.539h10.127c.531 0 1.039.21 1.414.585L59.281 50.21z" />
    </g>
  );
}

export default SVGComponent(LogoIcon, {
  viewBox: '0 0 100 100',
  strokeLinecap: 'round',
});
