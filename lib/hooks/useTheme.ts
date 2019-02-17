import themeContext from '@self/components/themeContext';
import { useContext } from 'react';

function useTheme() {
  let context = useContext(themeContext);
  return context;
}

export default useTheme;
