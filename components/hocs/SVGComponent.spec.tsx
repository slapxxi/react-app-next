/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { render } from 'react-testing-library';
import SVGComponent from './SVGComponent';

it('renders', () => {
  let Component = SVGComponent(() => <circle cx="10" cy="10" r="5" />);
  let { container } = render(<Component size={24} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('accepts configuration', () => {
  let Component = SVGComponent(() => <circle cx="10" cy="10" r="5" />, {
    viewBox: '0 0 10 10',
  });
  let { container } = render(<Component size={24} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('accepts css property', () => {
  let Component = SVGComponent(() => <circle cx="10" cy="10" r="5" />);
  let { container } = render(
    <Component
      size={24}
      css={css`
        fill: red;
      `}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});
