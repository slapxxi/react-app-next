import { render } from 'react-testing-library';
import Index from './index';

it('works', () => {
  let { container } = render(<Index />);
  expect(container.firstChild).toMatchSnapshot();
});
