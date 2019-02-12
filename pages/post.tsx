import { RouterProps, withRouter } from 'next/router';

interface Props {
  router: RouterProps;
}

function Component({ router }: Props) {
  return (
    <div>
      <h1>{router.query!.title}</h1>
    </div>
  );
}

export default withRouter(Component);
