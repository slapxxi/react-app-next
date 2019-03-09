import { Theme } from '@self/lib/types';

let darkTheme: Theme = {
  type: 'dark',
  color: {
    background: 'hsl(230, 15%, 15%)',
    backgroundActive: 'hsl(230, 15%, 25%)',
    text: 'hsl(230, 10%, 75%)',
    em: 'hsl(230, 10%, 50%)',
    heading: 'hsl(230, 10%, 85%)',
    outline: 'hsl(230, 10%, 95%)',
    link: 'hotpink',
    linkActive: 'pink',
    selection: 'hotpink',
  },
  font: {
    text: 'IBM Plex Sans, Helvetica, sans-serif',
    heading: 'Open Sans, Helvetica, sans-serif',
  },
};

export default darkTheme;
