import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import posts from '@self/md/posts';
import { useState } from 'react';

function Blog() {
  let [load, setLoad] = useState(false);

  function handleLoad() {
    setLoad(true);
  }

  return (
    <PageContainer>
      <PageHeading>Blog</PageHeading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia molestiae
        voluptatem adipisci quasi, magni quidem quibusdam officiis dolores veniam error
        ratione ut sunt quae! Incidunt ducimus quod consequatur necessitatibus iste.
      </p>
      {load ? posts.map(({ Post, id }) => <Post key={id} />) : null}
      {!load && <button onClick={handleLoad}>Load</button>}
    </PageContainer>
  );
}

export default Blog;
