import { Theme } from '@self/lib/types';

let defaultTheme: Theme = {
  color: {
    background: '#fcfcff',
    text: 'hsl(220, 30%, 20%)',
    heading: 'hsl(220, 30%, 10%)',
    outline: '#112',
    link: 'hsl(210, 95%, 50%)',
    linkActive: 'hsl(210, 95%, 50%)',
    selection: 'hsla(200, 95%, 50%, 0.5)',
  },
  font: {
    text: 'IBM Plex Sans, Helvetica, sans-serif',
    heading: 'Open Sans, Helvetica, sans-serif',
  },
};

export default defaultTheme;
