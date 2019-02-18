import { Store } from '@self/lib/types';
import { createContext } from 'react';

let context = createContext<Store>({
  state: {
    items: [],
    settings: {
      useDarkMode: false,
    },
    lastUpdated: 0,
  },
  dispatch: (action: any) => undefined,
});

let { Provider } = context;

export { Provider };

export default context;
