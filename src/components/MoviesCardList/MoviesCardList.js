import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { debounce } from '../../utils/helpers';
import { useCallback, useEffect, useState } from 'react';

const MoviesCardList = ({ moviesData, isSubmitted, handleLikeMovie, deleteMovie, isSaved }) => {
  const [resultMoviesList, setResultMoviesList] = useState([]);
  const [limiter, setLimiter] = useState(7);
  const [addCounter, setAddCounter] = useState(7);

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
        <p className="movies-list__empty">{isSubmitted && 'Ничего не найдено'}</p>
      )}
    </section>
  );
};

export default MoviesCardList;
