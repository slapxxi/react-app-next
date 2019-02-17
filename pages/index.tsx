/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useStore from '@self/lib/hooks/useStore';

function Index() {
  let { state: store } = useStore();

  return (
    <div
      css={(theme) =>
        css`
          color: ${theme.color};
        `
      }
    >
      <section>
        <h1>Dictionary</h1>
        <ul>
          {store.items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Index;
