import redirectTo from '@self/lib/redirectTo';
import { SessionContext } from '@self/lib/types';
import { NextComponentType } from 'next';

function withAuth<P, IP>(
  Component: NextComponentType<P, IP | undefined, SessionContext>,
): NextComponentType<P, IP | undefined, SessionContext> {
  let originalGetInitialProps = Component.getInitialProps;

  Component.displayName = Component.displayName
    ? `withAuth(${Component.displayName})`
    : 'withAuth';

  Component.getInitialProps = async (context: SessionContext) => {
    let { req, res } = context;

    if (res && req && !req.session.decodedToken) {
      redirectTo(res, '/login');
    }

    if (originalGetInitialProps) {
      return originalGetInitialProps(context);
    }
  };

  return Component;
}

export default withAuth;
