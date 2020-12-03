export function host(endpoint) {
  const appId = '5BDFCD08-36D1-D8FE-FF9E-B312ECB3DC00';
  const restApiKey = '70EBAFD8-2834-4916-B7E2-A2212A7498FE';

  return `https://api.backendless.com/${appId}/${restApiKey}/${endpoint}`;
}

const endpoints = {
  REGISTER: 'users/register',
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  MOVIES: 'data/movies',
};

//REGISTER USER
export async function registerAsync(email, password, userName, mobile) {
  return (await fetch(host(endpoints.REGISTER), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email,
          password,
          userName,
          mobile
      })
  })).json()
}

//LOGIN USER WITH EMAIL
export async function loginAsync(email, password) {
  const result = await (await fetch(host(endpoints.LOGIN), {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          login: email,
          password
      })
  })).json();

  return result;
}

//LOGOUT USER
export async function logoutAsync() {
  const token = localStorage.getItem('userToken');
  localStorage.removeItem('userToken');

  return await fetch(host(endpoints.LOGOUT), {
      headers: {
          'user-token': token
      }
  });
}
