import { Store } from '@self/lib/types';
import { createContext } from 'react';

let context = createContext<Store>({
  state: {
    user: null,
    settings: {
      useDarkMode: false,
    },
    lastUpdated: 0,
  },
  isSyncing: false,
  dispatch: (_) => {},
});

let { Provider } = context;

export { Provider };

export default context;
