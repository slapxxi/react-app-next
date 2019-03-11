import { Mock, SessionContext } from '@self/lib/types';
import Login from '@self/pages/login';

let mockSessionContext: Mock<SessionContext>;

beforeEach(() => {
  mockSessionContext = {
    req: {
      session: {
        decodedToken: { uid: 'random-user-id' },
      },
    },
    res: {
      writeHead: jest.fn(),
      end: jest.fn(),
    },
  };
});

it('redirects when user authenticated', async () => {
  await Login.getInitialProps(mockSessionContext);

  expect(mockSessionContext.res.end).toHaveBeenCalledTimes(1);
  expect(mockSessionContext.res.writeHead).toHaveBeenCalledTimes(1);
  expect(mockSessionContext.res.writeHead).toHaveBeenCalledWith(302, { Location: '/' });
});

it('does nothing when user not authenticated', async () => {
  await Login.getInitialProps({});

  expect(mockSessionContext.res.end).not.toHaveBeenCalled();
  expect(mockSessionContext.res.writeHead).not.toHaveBeenCalled();
});
