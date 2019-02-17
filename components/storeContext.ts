import { Store } from '@self/lib/types';
import { createContext } from 'react';

let context = createContext<Store>({
  state: {
    items: [],
    settings: {
      useDarkMode: false,
    },
  },
  dispatch: (action: StoreAction) => null,
});

let { Provider } = context;

export { Provider };

export default context;
