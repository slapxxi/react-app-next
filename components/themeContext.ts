import { Theme } from '@self/lib/types';
import defaultTheme from '@self/styles/defaultTheme';
import { createContext } from 'react';

let themeContext = createContext<Theme>(defaultTheme);

let { Provider: ThemeProvider, Consumer: ThemeConsumer } = themeContext;

export { ThemeProvider, ThemeConsumer };
export default themeContext;
