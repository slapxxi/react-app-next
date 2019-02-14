import { Store as IStore } from '@self/lib/types';
import { Provider } from './storeContext';

interface Props {
  children: React.ReactChild;
  init: IStore;
}

let defaultStore = { items: [] };

function Store({ children, init = defaultStore }: Props) {
  return <Provider value={init}>{children}</Provider>;
}

export default Store;
