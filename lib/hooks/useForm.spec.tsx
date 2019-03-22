import { render } from 'react-testing-library';
import useForm from './useForm';

it('provides form state with default values', () => {
  function Component() {
    let [state] = useForm({
      fields: {
        name: 'user',
        password: '12345',
      },
    });
    return (
      <span>
        {state.formState.name}:{state.formState.password}
      </span>
    );
  }

  let { container } = render(<Component />);

  expect(container.firstChild!.textContent).toEqual('user:12345');
});
