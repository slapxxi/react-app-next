import Header from '@self/components/Header';
import { RouterProps, withRouter } from 'next/router';

interface Props {
  router: RouterProps;
}

function Post({ router }: Props) {
  return (
    <div>
      <Header />
      <h1>{router.query!.id}</h1>
    </div>
  );
}

export default withRouter(Post);
