/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SVGComponent from '@self/components/hocs/SVGComponent';

function SyncIcon() {
  return (
    <g
      css={(theme) => css`
        fill: none;
        stroke: ${theme.outline};
      `}
    >
      <path
        d="M69.703,65.94l6.276,0c11.464,0 20.772,-9.14 20.772,-20.605c0,-7.762 -4.267,-14.536 -10.582,-18.101c0.044,-0.567 0.067,-1.14 0.067,-1.718c0,-12.104 -9.828,-21.932 -21.932,-21.932c-7.063,0 -13.35,3.346 -17.363,8.537c-0.706,-0.069 -1.423,-0.104 -2.147,-0.104c-8.755,0 -16.319,5.141 -19.835,12.567c-0.311,-0.014 -0.623,-0.021 -0.938,-0.021c-11.464,0 -20.772,9.308 -20.772,20.772c0,10.567 7.907,19.302 18.123,20.605l13.227,0"
        css={{ strokeWidth: 8 }}
      />
      <path d="M52.241,65.94l0,-40.913" css={{ strokeWidth: 6 }} />
      <path d="M52.241,25.027l-10.321,10.321" css={{ strokeWidth: 6 }} />
      <path d="M52.241,25.027l10.321,10.321" css={{ strokeWidth: 6 }} />
    </g>
  );
}

export default SVGComponent(SyncIcon, {
  viewBox: '-5 -5 110 110',
  strokeLinecap: 'round',
});
