import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ isButtonNeed, moviesData, isOwner }) => {
  return (
    <section className="movies-list">
      <ul className={`movies-list__container ${!isButtonNeed && 'movies-list__container_full'}`}>
        {moviesData.map((item, index) => (
          <MoviesCard
            key={index}
            name={item.name}
            img={item.img}
            duration={item.duration}
            isLiked={item.isLiked}
            isOwner={isOwner}
          />
        ))}
      </ul>
      {isButtonNeed && <button className="movies-list__button">Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
