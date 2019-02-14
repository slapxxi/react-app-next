import clamp from 'lodash-es/clamp';
import { useState } from 'react';

interface Config {
  min: number;
  max: number;
}

type UserConfig = Partial<Config>;

type Fn = (counter: number) => number;

let defaultConfig = {
  min: -Infinity,
  max: Infinity,
};

function useCounter(
  initial: number,
  userConfig: UserConfig = {},
): [number, (n: Fn) => void] {
  let config: Config = { ...defaultConfig, ...userConfig };
  let [counter, setCounter] = useState(clamp(initial, config.min, config.max));
  return [
    counter,
    (fn) => {
      setCounter(clamp(fn(counter), config.min, config.max));
    },
  ];
}

export default useCounter;
