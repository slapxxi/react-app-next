import { ServerResponse } from 'http';

function redirectTo(res: ServerResponse, to: string) {
  res.writeHead(302, { Location: to });
  res.end();
}

export default redirectTo;
