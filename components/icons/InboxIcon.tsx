/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SVGComponent from '@self/components/hocs/SVGComponent';

function InboxIcon() {
  return (
    <g
      css={(theme) => css`
        fill: none;
        stroke: ${theme.outline};
      `}
    >
      <path
        d="M5.001,46.013l28.327,0c0,9.201 7.471,16.671 16.672,16.671c9.201,0 16.672,-7.47 16.672,-16.671l28.327,0"
        css={{ strokeWidth: 6 }}
      />
      <path
        d="M5.001,46.013l18.999,-19.235l52,0l18.999,19.235l0,27.321c0,1.278 -0.508,2.505 -1.412,3.409c-0.904,0.904 -2.13,1.412 -3.409,1.412c-15.621,0 -64.735,0 -80.356,0c-1.279,0 -2.505,-0.508 -3.409,-1.412c-0.904,-0.904 -1.412,-2.131 -1.412,-3.409l0,-27.321Z"
        css={{ strokeWidth: 8 }}
      />
    </g>
  );
}

export default SVGComponent(InboxIcon, {
  viewBox: '0 0 100 100',
  strokeLinecap: 'round',
});
