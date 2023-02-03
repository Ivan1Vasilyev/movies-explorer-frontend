const baseUrl = 'https://api.moovies.nomoredomains.rocks';
const headers = { 'Content-Type': 'application/json' };

const responseHandler = (response) =>
  response.ok ? response.json() : Promise.reject(response.json());

const customFetch = (method, url) => async (data) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: method,
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const register = customFetch('POST', 'signup');

export const login = customFetch('POST', 'signin');
