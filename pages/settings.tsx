/** @jsx jsx */
import { jsx } from '@emotion/core';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import Link from 'next/link';
import { ChangeEvent } from 'react';

function Settings() {
  let { state, actions } = useStore();

  function handleToggleDarkMode(event: ChangeEvent<HTMLInputElement>) {
    actions.updateSettings({
      ...state.settings,
      useDarkMode: event.target.checked,
    });
  }

  function handleToggleReduceMotion(event: ChangeEvent<HTMLInputElement>) {
    actions.updateSettings({
      ...state.settings,
      reduceMotion: event.target.checked,
    });
  }

  return (
    <PageContainer>
      <PageHeading>Settings</PageHeading>
      <div>
        <input
          type="checkbox"
          id="use-dark-theme"
          checked={state.settings.useDarkMode}
          onChange={handleToggleDarkMode}
        />
        <label htmlFor="use-dark-theme">Dark mode</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="reduce-motion"
          checked={state.settings.reduceMotion}
          onChange={handleToggleReduceMotion}
        />
        <label htmlFor="reduce-motion">Reduce motion</label>
      </div>
      <div>
        <Link href="/login">
          <a href="/login">Sign Out</a>
        </Link>
      </div>
    </PageContainer>
  );
}

export default Settings;
