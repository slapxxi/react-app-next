/** @jsx jsx */
import { jsx } from '@emotion/core';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import Link from 'next/link';
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
    <PageContainer>
      <PageHeading>Settings</PageHeading>
      <input
        type="checkbox"
        id="use-dark-theme"
        checked={store.settings.useDarkMode}
        onChange={handleToggleDarkMode}
      />
      <label htmlFor="use-dark-theme">Dark Mode</label>
      <div>
        <Link href="/login">
          <a href="/login">Sign Out</a>
        </Link>
      </div>
    </PageContainer>
  );
}

export default Settings;
