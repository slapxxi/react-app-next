import { User } from '../types';

async function signIn(user: firebase.User): Promise<User> {
  let token = await user.getIdToken();
  let response = await fetch('/api/login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ token }),
  });
  let json = await response.json();
  return json.decodedToken;
}

export default signIn;
