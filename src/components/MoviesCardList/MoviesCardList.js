import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { debounce } from '../../utils/helpers';
import { useEffect, useState } from 'react';

const MoviesCardList = ({ moviesData, isSubmitted, addMovie }) => {
  const [resultMoviesList, setResultMoviesList] = useState([]);
  const [limiter, setLimiter] = useState(7);
  const [addCounter, setAddCounter] = useState(7);

  const addMoviesClick = () => setLimiter((state) => state + addCounter);

  const setter = (states) => {
    setLimiter(states[0]);
    setAddCounter(states[1]);
  };

  useEffect(() => {
    if (!moviesData.length) return;

    setResultMoviesList(moviesData.filter((_, index) => index < limiter));
  }, [moviesData, limiter]);

  useEffect(() => {
    const { length } = resultMoviesList;

    if (!length && window.innerWidth < 481) {
      setter([5, 2]);
      return;
    }

    const moviesSizeListener = debounce(
      481,
      setter,
      [length < 7 ? 7 : length, 7],
      [length === 7 ? 5 : length, 2],
    );
    window.addEventListener('resize', moviesSizeListener);

    return () => window.removeEventListener('resize', moviesSizeListener);
  }, [resultMoviesList]);

  return (
    <section className="movies-list">
      {moviesData.length ? (
        <ul
          className={`movies-list__container ${
            limiter > moviesData.length && 'movies-list__container_full'
          }`}
        >
          {resultMoviesList.map((item) => (
            <MoviesCard key={item.movieId} addMovie={addMovie} data={item} />
          ))}
        </ul>
      ) : (
        <p className="movies-list__empty">{isSubmitted && 'Ничего не найдено'}</p>
      )}
      {limiter < moviesData.length && (
        <button className="movies-list__button" onClick={addMoviesClick}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
