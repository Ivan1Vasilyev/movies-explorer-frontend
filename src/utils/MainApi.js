const baseUrl = 'https://api.moovies.nomoredomains.rocks';
export const headers = { 'Content-Type': 'application/json' };

export const responseHandler = (response) =>
  response.ok ? response.json() : Promise.reject(response.json());

const multiFetch = (method, url) => async (data) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return responseHandler(response);
};

export const register = multiFetch('POST', 'signup');

export const login = multiFetch('POST', 'signin');

export const logout = multiFetch('POST', 'signout');

export const updateUser = multiFetch('PATCH', 'users/me');

export const getUserInfo = async () => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

export const addMovie = multiFetch('POST', 'movies');

export const deleteMovie = async (id) => {
  const response = await fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};
