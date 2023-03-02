import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { debounce } from '../../utils/helpers';
import { useCallback, useEffect, useState } from 'react';
import {
  COUNT_BIG_SCREEN,
  COUNT_SMALL_SCREEN,
  STEP_BIG_SCREEN,
  STEP_SMALL_SCREEN,
  CHANGE_STEP_WIDTH,
} from '../../utils/constants';

const MoviesCardList = ({ moviesData, isSubmitted, handleLikeMovie, isSaved, errorMessage }) => {
  const [resultMoviesList, setResultMoviesList] = useState([]);
  const [limiter, setLimiter] = useState(COUNT_BIG_SCREEN);
  const [addCounter, setAddCounter] = useState(STEP_BIG_SCREEN);

  const addMoviesClick = useCallback(() => setLimiter((state) => state + addCounter), [addCounter]);

  const setButton = (states) => {
    setLimiter(states[0]);
    setAddCounter(states[1]);
  };

  useEffect(() => {
    if (isSaved) {
      setResultMoviesList(moviesData);
      return;
    }

    setResultMoviesList(moviesData.filter((_, index) => index < limiter));
  }, [moviesData, limiter]);

  useEffect(() => {
    if (isSaved) return;
    const { length } = resultMoviesList;

    if (!length && window.innerWidth < CHANGE_STEP_WIDTH) {
      setButton([COUNT_SMALL_SCREEN, STEP_SMALL_SCREEN]);
      return;
    }

    const moviesSizeListener = debounce(
      CHANGE_STEP_WIDTH,
      setButton,
      [length < COUNT_BIG_SCREEN ? COUNT_BIG_SCREEN : length, STEP_BIG_SCREEN],
      [length === COUNT_BIG_SCREEN ? COUNT_SMALL_SCREEN : length, STEP_SMALL_SCREEN],
    );
    window.addEventListener('resize', moviesSizeListener);

    return () => window.removeEventListener('resize', moviesSizeListener);
  }, [resultMoviesList]);

  return (
    <section className="movies-list">
      {moviesData.length ? (
        <>
          <ul
            className={`movies-list__container ${
              limiter > moviesData.length && 'movies-list__container_full'
            }`}
          >
            {resultMoviesList.map((movie) => (
              <MoviesCard
                key={movie.movieId}
                handleLikeMovie={handleLikeMovie}
                data={movie}
                isSaved={isSaved}
              />
            ))}
          </ul>
          {!isSaved && limiter < moviesData.length && (
            <button
              onClick={addMoviesClick}
              className="movies-list__button"
              type="button"
              aria-label="Ещё"
            >
              Ещё
            </button>
          )}
        </>
      ) : (
        <p className="movies-list__empty">{errorMessage || (isSubmitted && 'Ничего не найдено')}</p>
      )}
    </section>
  );
};

export default MoviesCardList;
