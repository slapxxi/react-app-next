/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useStore from '@self/lib/hooks/useStore';
import { Theme } from '@self/lib/types';
import { ChangeEvent } from 'react';

function Settings() {
  let { state: store, actions } = useStore();

  function handleToggleDarkMode(event: ChangeEvent<HTMLInputElement>) {
    actions.updateSettings({
      ...store.settings,
      useDarkMode: event.target.checked,
    });
  }

  return (
    <div css={containerStyles}>
      <h1>Settings</h1>
      <input
        type="checkbox"
        id="use-dark-theme"
        checked={store.settings.useDarkMode}
        onChange={handleToggleDarkMode}
      />
      <label htmlFor="use-dark-theme">Dark Mode</label>
    </div>
  );
}

function containerStyles(theme: Theme) {
  return css`
    color: ${theme.color};
  `;
}

export default Settings;
