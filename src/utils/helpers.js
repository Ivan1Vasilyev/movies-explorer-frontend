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
