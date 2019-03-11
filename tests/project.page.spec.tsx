import fetchProject from '@self/lib/services/fetchProject';
import { Mock, SessionContext } from '@self/lib/types';
import Project from '@self/pages/project';

let sessionContext: Mock<SessionContext>;
let getInitialProps = Project.getInitialProps!;

jest.mock('@self/lib/services/fetchProject', () =>
  jest.fn(() => ({
    id: 'fake-project',
  })),
);

beforeEach(() => {
  (fetchProject as jest.Mock).mockClear();
});

it.todo('renders project');

describe('given executed on the server', () => {
  describe('when user authenticated', () => {
    beforeEach(() => {
      sessionContext = {
        query: { param: 'test' },
        req: {
          firebaseServer: jest.fn(),
          session: {
            decodedToken: { uid: 'user-id' },
          },
        },
        res: {
          writeHead: jest.fn(),
          end: jest.fn(),
        },
      };
    });

    it('extracts project information', async () => {
      sessionContext.query = { projectId: 'project-id' };

      let initialProps = await getInitialProps(sessionContext);

      expect(fetchProject).toHaveBeenCalledTimes(1);
      expect(fetchProject).toHaveBeenCalledWith(
        sessionContext.req.firebaseServer,
        { uid: 'user-id' },
        'project-id',
      );
      expect(initialProps).toEqual({
        project: { id: 'fake-project' },
        projectId: 'project-id',
      });
    });

    it('redirects when query missing required data', async () => {
      await getInitialProps(sessionContext);

      expect(sessionContext.res.end).toHaveBeenCalledTimes(1);
      expect(sessionContext.res.writeHead).toHaveBeenCalledTimes(1);
      expect(sessionContext.res.writeHead).toHaveBeenCalledWith(302, {
        Location: '/projects',
      });
    });
  });

  describe('when user not authenticated', () => {
    it.todo('redirects to login page');
  });
});

describe('given executed on the client', () => {
  it.todo('gets project from the store');
});
