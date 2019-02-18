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

let containerStyles = (theme: Theme) => css`
  background: ${theme.color.background};
  color: ${theme.color.text};
`;

function AppContainer({ children }: Props) {
  let { state } = useStore();
  let { useDarkMode } = state.settings;

  return (
    <ThemeProvider theme={useDarkMode ? darkTheme : defaultTheme}>
      <Global styles={globalStyles} />
      <section css={containerStyles}>
        <Header />
        {children}
      </section>
    </ThemeProvider>
  );
}

export default AppContainer;
