import { headers, responseHandler } from './MainApi';

const beatfilmUrl = 'https://api.nomoreparties.co/beatfilm-movies';

const getMovies = async () => {
  const response = await fetch(beatfilmUrl, {
    method: 'GET',
    headers,
  });
  return responseHandler(response);
};

export default getMovies;
