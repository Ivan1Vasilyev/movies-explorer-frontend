import { ALL_MOVIES_KEY } from './constants';

export const debounce = (size, setter, argForBigScreen, argForSmallScreen) => {
  let isCooldown = false;

  return (e) => {
    if (isCooldown) return;
    if (e.target.innerWidth > size) {
      setter(argForBigScreen);
    } else if (argForSmallScreen) {
      setter(argForSmallScreen);
    }
    isCooldown = true;
    setTimeout(() => (isCooldown = false), 100);
  };
};

export const handleError = async (err, message) => {
  const error = await err;
  if (message) console.log(message);
  console.log(error);
  return error.message;
};

export const parseDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return hours ? (minutes ? `${hours}ч ${minutes}м` : `${hours}ч`) : `${minutes}м`;
};

export const durationFilter = (movie) => movie.duration < 41;

export const wordFilter = (word, movie) => {
  const { country, director, description, nameRU, nameEN } = movie;
  const search = new RegExp(word, 'i');
  return (
    search.test(country) ||
    search.test(director) ||
    search.test(description) ||
    search.test(nameRU) ||
    search.test(nameEN)
  );
};

const adaptDataToPage = (data) => ({
  country: data.country,
  director: data.director,
  duration: data.duration,
  description: data.description,
  image: `https://api.nomoreparties.co/${data.image.url}`,
  trailerLink: data.trailerLink,
  thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
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

export const getAllDefaultMovies = async (getMovies, setLoading) => {
  let allMovies = JSON.parse(localStorage.getItem(ALL_MOVIES_KEY));

  if (!allMovies) {
    if (setLoading) setLoading(true);

    const defaultMovies = await getMovies();
    allMovies = defaultMovies.map(adaptDataToPage);
    localStorage.setItem(ALL_MOVIES_KEY, JSON.stringify(allMovies));

    if (setLoading) setLoading(false);
  }

  return allMovies;
};

const getAllSavedMovies = async (getSavedMovies, currentUserId) => {
  const key = getAllSavedMoviesKey(currentUserId);
  let allSavedMovies = JSON.parse(localStorage.getItem(key));

  if (!allSavedMovies) {
    allSavedMovies = await getSavedMovies();
    localStorage.setItem(key, JSON.stringify(allSavedMovies));
  }

  return allSavedMovies;
};

const handleLocalStore = (add) => async (movie, currentUserId, getSavedMovies) => {
  const key = getAllSavedMoviesKey(currentUserId);
  const savedMovies = JSON.parse(localStorage.getItem(key));

  if (savedMovies) {
    const allSavedMovies = await getSavedMovies();
    localStorage.setItem(key, JSON.stringify(allSavedMovies));
    return;
  }

  if (add) {
    savedMovies.push(movie);
    localStorage.setItem(key, JSON.stringify(savedMovies));
  } else {
    localStorage.setItem(key, JSON.stringify(savedMovies.filter((m) => m._id !== movie._id)));
  }
};

export const removeSavedMovieFromStore = handleLocalStore();

export const addSavedMovieToStore = handleLocalStore(true);

export const getMoviesId = async (movieId, getSavedMovies, currentUserId) => {
  const allSavedMovies = await getAllSavedMovies(getSavedMovies, currentUserId);
  return allSavedMovies.find((item) => item.movieId === movieId)._id;
};

export const updateAllMovies = async (getDefaultMovies, deletingMovie, currentUserId) => {
  const allMovies = await getAllDefaultMovies(getDefaultMovies);
  const index = allMovies.findIndex((m) => m.movieId === deletingMovie.movieId);
  allMovies[index].owners = allMovies[index].owners.filter((m) => m !== currentUserId);
  localStorage.setItem(ALL_MOVIES_KEY, JSON.stringify(allMovies));
};

export const updateLikes = async (getDefaultMovies, getSavedMovies, currentUserId) => {
  const savedMovies = await getAllSavedMovies(getSavedMovies, currentUserId);
  const allMovies = await getAllDefaultMovies(getDefaultMovies);
  savedMovies.forEach((s) => {
    const index = allMovies.findIndex((m) => m.movieId === s.movieId);
    if (!allMovies[index].owners.includes(currentUserId)) {
      allMovies[index].owners.push(currentUserId);
    }
  });
  localStorage.setItem(ALL_MOVIES_KEY, JSON.stringify(allMovies));
};
