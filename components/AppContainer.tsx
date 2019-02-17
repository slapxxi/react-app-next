/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import useStore from '@self/lib/hooks/useStore';
import { Theme } from '@self/lib/types';
import darkTheme from '@self/styles/darkTheme';
import defaultTheme from '@self/styles/defaultTheme';
import globalStyles from '@self/styles/globalStyles';
import { ThemeProvider } from 'emotion-theming';
import Header from './Header';

interface Props extends React.ComponentProps<any> {}

function AppContainer({ children }: Props) {
  let {
    state: {
      settings: { useDarkMode },
    },
  } = useStore();

  return (
    <ThemeProvider theme={useDarkMode ? darkTheme : defaultTheme}>
      <Global styles={globalStyles(useDarkMode)} />
      <section css={containerStyles}>
        <Header />
        {children}
      </section>
    </ThemeProvider>
  );
}

function containerStyles(theme: Theme) {
  return css`
    background: ${theme.background};
    color: ${theme.color};
  `;
}

export default AppContainer;
