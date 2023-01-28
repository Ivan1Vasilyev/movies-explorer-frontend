import './MoviesCard.css';
import like from '../../images/like.svg';
import liked from '../../images/like-active.svg';
import deleteIcon from '../../images/delete.svg';

const MoviesCard = ({ name, img, duration, isLiked, isOwner }) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  const time = hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  return (
    <li className="movie">
      <div className="movie__info">
        <h2 className="movie__name">{name}</h2>
        <p className="movie__duration">{time}</p>
        <img
          className="movie__like"
          src={isOwner ? deleteIcon : isLiked ? liked : like}
          alt={isOwner ? 'Удалить из коллекции' : 'Добавить в коллекцию'}
        />
      </div>
      <img className="movie__poster" src={img} alt="Постер к фильму" />
    </li>
  );
};

export default MoviesCard;
