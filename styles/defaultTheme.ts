import { Theme } from '@self/lib/types';

let defaultTheme: Theme = {
  color: {
    background: '#fcfcff',
    text: 'hsl(220, 30%, 20%)',
    heading: 'hsl(220, 30%, 10%)',
    outline: '#112',
    link: 'hsl(210, 95%, 50%)',
    linkActive: 'hsl(210, 95%, 50%)',
    selection: 'yellow',
  },
  font: {
    text: 'IBM Plex Sans, sans-serif',
    heading: 'Unna, Scope One, sans-serif',
  },
};

export default defaultTheme;
