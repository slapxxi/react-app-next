async function signOut() {
  let response = await fetch('/api/logout', {
    method: 'POST',
    credentials: 'same-origin',
  });
  return response;
}

export default signOut;
