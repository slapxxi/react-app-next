import { useState } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import useStorage from './useStorage';

let localStorage = window.localStorage;
let sessionStorage = window.sessionStorage;

beforeEach(() => {
  process.browser = true;
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(cleanup);

it('does not reset existing value on initial call', () => {
  function Component() {
    let [storage] = useStorage({
      id: 'test',
      type: 'localStorage',
      data: 'new',
    });
    return <div>{storage}</div>;
  }

  let existingValue = JSON.stringify('old');
  window.localStorage.setItem('test:localhost', existingValue);
  let { container } = render(<Component />);

  expect(localStorage.getItem('test:localhost')).toEqual(existingValue);
  expect(container.firstChild!.textContent).toEqual('old');
});

it('resets existing value on callback call', () => {
  function Component() {
    let [storage, setStorage] = useStorage({
      id: 'test',
      type: 'localStorage',
      data: '...',
    });
    return (
      <button data-testid="trigger" onClick={() => setStorage('new')}>
        {storage}
      </button>
    );
  }

  let existingValue = JSON.stringify('old');
  window.localStorage.setItem('test:localhost', existingValue);
  let { container, getByTestId } = render(<Component />);
  fireEvent.click(getByTestId('trigger'));

  expect(localStorage.getItem('test:localhost')).toEqual(JSON.stringify('new'));
  expect(container.firstChild!.textContent).toEqual('old');
});

it('sets item value with callback', () => {
  function Component() {
    let [storage, setStorage] = useStorage({
      id: 'test',
      type: 'localStorage',
      data: { value: 'initial' },
    });
    return (
      <button data-testid="trigger" onClick={() => setStorage({ value: 'new' })}>
        {storage.value}
      </button>
    );
  }

  let { getByTestId } = render(<Component />);
  fireEvent.click(getByTestId('trigger'));

  expect(localStorage.getItem('test:localhost')).toEqual(
    JSON.stringify({ value: 'new' }),
  );
});

it('sets localStorage item', () => {
  function Component() {
    let [storage] = useStorage({
      id: 'test',
      type: 'localStorage',
      data: { name: 'user', pass: '12345' },
    });

    return (
      <div>
        {storage.name}:{storage.pass}
      </div>
    );
  }

  let { container } = render(<Component />);

  expect(localStorage.getItem('test:localhost')).toEqual(
    JSON.stringify({ name: 'user', pass: '12345' }),
  );
  expect(container.firstChild!.textContent).toEqual('user:12345');
});

it('sets sessionStorage item', () => {
  function Component() {
    let [storage] = useStorage({
      id: 'test',
      type: 'sessionStorage',
      data: { name: 'user', pass: '12345' },
    });

    return (
      <div>
        {storage.name}:{storage.pass}
      </div>
    );
  }

  let { container } = render(<Component />);

  expect(sessionStorage.getItem('test:localhost')).toEqual(
    JSON.stringify({ name: 'user', pass: '12345' }),
  );
  expect(container.firstChild!.textContent).toEqual('user:12345');
});

it('works if storage not supported', () => {
  jest.mock('@self/lib/storageAvailable', () => () => false);

  function Component() {
    let [state, setState] = useState(false);
    let [storage, setStorage] = useStorage({
      id: 'test',
      type: 'localStorage',
      data: { value: 'initial' },
    });

    return (
      <button
        data-testid="trigger"
        onClick={() => {
          setStorage({ value: 'new' });
          setState(!state);
        }}
      >
        {storage.value}
      </button>
    );
  }

  let { container, getByTestId } = render(<Component />);
  fireEvent.click(getByTestId('trigger'));

  expect(container.firstChild!.textContent).toEqual('new');
});
