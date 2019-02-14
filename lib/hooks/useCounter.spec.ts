import { act, cleanup, testHook } from 'react-testing-library';
import useCounter from './useCounter';

afterEach(cleanup);

it('sets initial value', () => {
  let count;
  testHook(() => ([count] = useCounter(10)));
  expect(count).toEqual(10);
});

it('respects max config value', () => {
  let count;
  testHook(() => ([count] = useCounter(10, { max: 3 })));
  expect(count).toEqual(3);
});

it('respects min config value', () => {
  let count;
  testHook(() => ([count] = useCounter(2, { min: 3 })));
  expect(count).toEqual(3);
});

it('sets value', () => {
  let count;
  let set: (arg0: (n: number) => number) => void;
  testHook(() => {
    [count, set] = useCounter(0);
  });
  act(() => {
    set((n) => n + 1);
  });
  expect(count).toEqual(1);
});

it('clamps value', () => {
  let count;
  let set: (arg0: (n: number) => number) => void;
  testHook(() => {
    [count, set] = useCounter(0, { max: 5 });
  });
  act(() => {
    set((n) => n + 10);
  });
  expect(count).toEqual(5);
});
