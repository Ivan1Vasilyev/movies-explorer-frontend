import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { debounce } from '../../utils/helpers';
import { useEffect, useState } from 'react';

const MoviesCardList = ({ moviesData, isOwner, isSubmitted }) => {
  const [resultMoviesList, setResultMoviesList] = useState([]);
  const [limiter, setLimiter] = useState(7);
  const [addCounter, setAddCounter] = useState(7);

  const addMovies = () => setLimiter((state) => state + addCounter);

  const setter = (states) => {
    setLimiter(states[0]);
    setAddCounter(states[1]);
  };

  useEffect(() => {
    if (window.innerWidth < 481) setter([5, 2]);
  }, []);

  useEffect(() => {
    if (!moviesData.length) return;

    setResultMoviesList(moviesData.filter((_, index) => index < limiter));
  }, [moviesData, limiter]);

  useEffect(() => {
    const { length } = resultMoviesList;
    if (!length) return;

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
            <MoviesCard
              key={item.movieId}
              name={item.nameRU}
              image={item.image}
              duration={item.duration}
              isLiked={item.isLiked}
              isOwner={isOwner}
            />
          ))}
        </ul>
      ) : (
        <p className="movies-list__empty">{isSubmitted && 'Ничего не найдено'}</p>
      )}
      {limiter < moviesData.length && (
        <button className="movies-list__button" onClick={addMovies}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
