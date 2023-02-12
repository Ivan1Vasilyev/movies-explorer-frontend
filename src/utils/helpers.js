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

export const durationFilter = (movie) => movie.duration < 41;

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

export const getAllDefaultMovies = async (getMovies, setLoading) => {
  let allMovies = JSON.parse(localStorage.getItem(ALL_MOVIES_KEY)) || [];

  if (!allMovies.length) {
    if (setLoading) setLoading(true);

    const defaultMovies = await getMovies();
    allMovies = defaultMovies.map(adaptDataToPage);
    localStorage.setItem(ALL_MOVIES_KEY, JSON.stringify(allMovies));

    if (setLoading) setLoading(false);
  }

  return allMovies;
};

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

export const getMoviesId = async (movieId, getSavedMovies) => {
  const allSavedMovies = await getSavedMovies();
  return allSavedMovies.find((item) => item.movieId === movieId)._id;
};

export const updateAllMoves = async (getDefaultMovies, deletingMovie, id) => {
  const allMovies = await getAllDefaultMovies(getDefaultMovies);
  const movieToChange = allMovies.find((item) => item.movieId === deletingMovie.movieId);
  movieToChange.owners = movieToChange.owners.filter((m) => m !== id);

  localStorage.setItem(
    ALL_MOVIES_KEY,
    JSON.stringify(allMovies.map((m) => (m.movieId === movieToChange.movieId ? movieToChange : m))),
  );
};
