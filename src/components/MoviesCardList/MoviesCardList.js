import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { debounce } from '../../utils/helpers';
import { useEffect, useState } from 'react';

const MoviesCardList = ({ moviesData, isOwner }) => {
  const [resultMoviesList, setResultMoviesList] = useState([]);
  const [limiter, setLimiter] = useState(7);

  useEffect(() => {
    if (!resultMoviesList.length) return;

    const sizeListener = debounce(481, setLimiter, 7, 5);
    window.addEventListener('resize', sizeListener);

    return () => window.removeEventListener('resize', sizeListener);
  }, [resultMoviesList]);

  return (
    <section className="movies-list">
      <ul className={`movies-list__container ${false && 'movies-list__container_full'}`}>
        {moviesData.map((item) => (
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
      {true && <button className="movies-list__button">Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
