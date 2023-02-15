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

const MoviesCardList = ({
  moviesData,
  isSubmitted,
  handleLikeMovie,
  deleteMovie,
  isSaved,
  errorMessage,
}) => {
  const [resultMoviesList, setResultMoviesList] = useState([]);
  const [limiter, setLimiter] = useState(COUNT_BIG_SCREEN);
  const [addCounter, setAddCounter] = useState(STEP_BIG_SCREEN);

  const addMoviesClick = useCallback(() => setLimiter((state) => state + addCounter), [addCounter]);

  const setter = (states) => {
    setLimiter(states[0]);
    setAddCounter(states[1]);
  };

  useEffect(() => {
    if (isSaved || !moviesData.length) return;

    setResultMoviesList(moviesData.filter((_, index) => index < limiter));
  }, [moviesData, limiter]);

  useEffect(() => {
    if (isSaved) return;
    const { length } = resultMoviesList;

    if (!length && window.innerWidth < CHANGE_STEP_WIDTH) {
      setter([COUNT_SMALL_SCREEN, STEP_SMALL_SCREEN]);
      return;
    }

    const moviesSizeListener = debounce(
      CHANGE_STEP_WIDTH,
      setter,
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
            {isSaved
              ? moviesData.map((item) => (
                  <MoviesCard
                    key={item._id}
                    deleteMovie={deleteMovie}
                    data={item}
                    isSaved={isSaved}
                  />
                ))
              : resultMoviesList.map((item) => (
                  <MoviesCard key={item.movieId} handleLikeMovie={handleLikeMovie} data={item} />
                ))}
          </ul>
          {isSaved
            ? null
            : limiter < moviesData.length && (
                <button className="movies-list__button" onClick={addMoviesClick}>
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
