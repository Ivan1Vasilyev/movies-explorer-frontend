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
  return hours ? (minutes === 0 ? `${hours}ч` : `${hours}ч ${minutes}м`) : `${minutes}м`;
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

export const dataFilter = (data) => ({
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

export const getAllMovies = async (setLoading, getMovies, key) => {
  let allMovies = JSON.parse(localStorage.getItem(key)) || [];

  if (!allMovies.length) {
    setLoading(true);
    const defaultMovies = await getMovies();
    allMovies = defaultMovies.map(dataFilter);
    localStorage.setItem(key, JSON.stringify(allMovies));
    setLoading(false);
  }

  return allMovies;
};

export const adaptDataToDB = (movie, id) => ({
  country: movie.country,
  director: movie.director,
  duration: movie.duration,
  description: movie.description,
  image: movie.image,
  trailerLink: movie.trailerLink,
  thumbnail: movie.thumbnail,
  movieId: movie.movieId,
  nameRU: movie.nameRU,
  nameEN: movie.nameEN,
  year: movie.year,
  owner: id,
});

export const getAllSavedMoviesKey = (id) => `${id}all`;
