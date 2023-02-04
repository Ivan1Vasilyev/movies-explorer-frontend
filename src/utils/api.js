const baseUrl = 'https://api.moovies.nomoredomains.rocks';
const headers = { 'Content-Type': 'application/json' };

const responseHandler = (response) =>
  response.ok ? response.json() : Promise.reject(response.json());

const authFetch = (method, url) => async (data) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const register = authFetch('POST', 'signup');

export const login = authFetch('POST', 'signin');

export const logout = authFetch('POST', 'signout');

export const updateUser = authFetch('PATCH', 'users/me');

export const getUserInfo = async () => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return responseHandler(res);
};
