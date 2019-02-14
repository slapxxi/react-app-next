import storeContext from '@self/components/storeContext';
import { useContext } from 'react';

function useStore() {
  let context = useContext(storeContext);
  return context;
}

export default useStore;
