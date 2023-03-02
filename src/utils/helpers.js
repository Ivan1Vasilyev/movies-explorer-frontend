import {
  DEFAULT_MOVIES_KEY,
  SERVER_ERROR_MESSAGE,
  TYPE_ERROR_MESSAGE,
  SHORT_FILM_DURATION,
  DEFAULT_MOVIES_URL,
} from './constants';

export const debounce = (size, setter, bigScreenParam, smallScreenParam) => {
  let isCooldown = false;

  return (e) => {
    if (isCooldown) return;
    if (e.target.innerWidth > size) {
      setter(bigScreenParam);
    } else if (smallScreenParam) {
      setter(smallScreenParam);
    }
    isCooldown = true;
    setTimeout(() => (isCooldown = false), 100);
  };
};

export const handleError = async (err, errorMessage) => {
  const { status, name } = err;
  console.log(err);
  if (name === 'TypeError') return TYPE_ERROR_MESSAGE;
  if (status >= 500) return errorMessage || SERVER_ERROR_MESSAGE;
  const error = await err.json();
  console.log(error);
  return error.message;
};

export const parseDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return hours ? (minutes ? `${hours}ч ${minutes}м` : `${hours}ч`) : `${minutes}м`;
};

const durationFilter = (movie) => movie.duration <= SHORT_FILM_DURATION;

const wordFilter = (movie, keyWord) => {
  const { country, director, description, nameRU, nameEN } = movie;
  const search = new RegExp(keyWord, 'i');
  return (
    search.test(country) ||
    search.test(director) ||
    search.test(description) ||
    search.test(nameRU) ||
    search.test(nameEN)
  );
};

export const moviesFilter = (movie, keyWord, isOnlyShorts) => {
  const byWord = wordFilter(movie, keyWord);
  const isShort = durationFilter(movie);
  const result = isOnlyShorts ? byWord && isShort : byWord;
  return result;
};

const adaptDataToPage = (data) => ({
  country: data.country,
  director: data.director,
  duration: data.duration,
  description: data.description,
  image: `${DEFAULT_MOVIES_URL}${data.image.url}`,
  trailerLink: data.trailerLink,
  thumbnail: `${DEFAULT_MOVIES_URL}${data.image.formats.thumbnail.url}`,
  movieId: data.id,
  nameRU: data.nameRU,
  nameEN: data.nameEN,
  year: data.year,
  owners: [],
});

export const adaptDataToDB = (data, id) => ({
  country: data.country,
  director: data.director,
  duration: data.duration,
  description: data.description,
  image: data.image,
  trailerLink: data.trailerLink,
  thumbnail: data.thumbnail,
  movieId: data.movieId,
  nameRU: data.nameRU,
  nameEN: data.nameEN,
  year: data.year,
  owner: id,
});

export const getAllSavedMoviesKey = (id) => `${id}all`;

const checkData = (data) => data === null || data[0] !== '[';

export const getAllDefaultMovies = async (getMovies, setLoading) => {
  const data = localStorage.getItem(DEFAULT_MOVIES_KEY);

  if (checkData(data)) {
    if (setLoading) setLoading(true);

    const allMovies = await getMovies();
    const defaultMovies = allMovies.map(adaptDataToPage);
    localStorage.setItem(DEFAULT_MOVIES_KEY, JSON.stringify(defaultMovies));

    if (setLoading) setLoading(false);
    return defaultMovies;
  } else {
    return JSON.parse(data);
  }
};

export const getAllSavedMovies = async (getMovies, currentUserId, setLoading) => {
  const key = getAllSavedMoviesKey(currentUserId);
  const data = localStorage.getItem(key);

  if (checkData(data)) {
    if (setLoading) setLoading(true);

    const savedMovies = await getMovies();
    localStorage.setItem(key, JSON.stringify(savedMovies));

    if (setLoading) setLoading(false);
    return savedMovies;
  } else {
    return JSON.parse(data);
  }
};

const handleSavedMoviesStore = (handle) => async (movie, currentUserId, getSavedMovies) => {
  const key = getAllSavedMoviesKey(currentUserId);
  const data = localStorage.getItem(key);

  if (checkData(data)) {
    localStorage.setItem(key, JSON.stringify(await getSavedMovies()));
    return;
  }

  const updatedSavedMovies = handle(JSON.parse(data), movie);
  localStorage.setItem(key, JSON.stringify(updatedSavedMovies));
};

export const deleteSavedMovieFromStore = handleSavedMoviesStore((savedMovies, movie) => {
  return savedMovies.filter((m) => m._id !== movie._id);
});

export const addSavedMovieToStore = handleSavedMoviesStore((savedMovies, movie) => {
  savedMovies.push(movie);
  return savedMovies;
});

export const getMoviesId = async (movieId, getSavedMovies, currentUserId) => {
  const savedMovies = await getAllSavedMovies(getSavedMovies, currentUserId);
  return savedMovies.find((item) => item.movieId === movieId)._id;
};

export const updateAllMoviesFromSaved = async (movie, getDefaultMovies, currentUserId) => {
  const defaultMovies = await getAllDefaultMovies(getDefaultMovies);
  const index = defaultMovies.findIndex((m) => m.movieId === movie.movieId);
  defaultMovies[index].owners = defaultMovies[index].owners.filter((m) => m !== currentUserId);
  localStorage.setItem(DEFAULT_MOVIES_KEY, JSON.stringify(defaultMovies));
};

export const updateAllMovies = async (response, getDefaultMovies) => {
  const defaultMovies = await getAllDefaultMovies(getDefaultMovies);
  localStorage.setItem(
    DEFAULT_MOVIES_KEY,
    JSON.stringify(defaultMovies.map((m) => (m.movieId === response.movieId ? response : m))),
  );
};

export const updateLikes = async (getDefaultMovies, getSavedMovies, currentUserId) => {
  const savedMovies = await getAllSavedMovies(getSavedMovies, currentUserId);
  const defaultMovies = await getAllDefaultMovies(getDefaultMovies);
  savedMovies.forEach((s) => {
    const index = defaultMovies.findIndex((m) => m.movieId === s.movieId);
    if (!defaultMovies[index].owners.includes(currentUserId)) {
      defaultMovies[index].owners.push(currentUserId);
    }
  });
  localStorage.setItem(DEFAULT_MOVIES_KEY, JSON.stringify(defaultMovies));
};
