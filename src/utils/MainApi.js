const baseUrl = 'https://api.shaloban.students.nomoredomains.club';
export const headers = { 'Content-Type': 'application/json' };

export const responseHandler = (response) =>
  response.ok ? response.json() : Promise.reject(response);

const multiFetch = (method, route) => async (data) => {
  const response = await fetch(`${baseUrl}/${route}`, {
    method,
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return responseHandler(response);
};

const multiFetchWithoutBody = (method, route) => async (id) => {
  const response = await fetch(`${baseUrl}/${route}${id ? `/${id}` : ''}`, {
    method,
    headers,
    credentials: 'include',
  });
  return responseHandler(response);
};

export const register = multiFetch('POST', 'signup');

export const login = multiFetch('POST', 'signin');

export const logout = multiFetch('POST', 'signout');

export const updateUser = multiFetch('PATCH', 'users/me');

export const getUserInfo = multiFetchWithoutBody('GET', 'users/me');

export const getMovies = multiFetchWithoutBody('GET', 'movies');

export const addMovie = multiFetch('POST', 'movies');

export const deleteMovie = multiFetchWithoutBody('DELETE', 'movies');
