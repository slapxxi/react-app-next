import { Store } from '@self/lib/types';
import { createContext } from 'react';

let context = createContext<Store>({ items: [] });

let { Provider } = context;

export { Provider };

export default context;
