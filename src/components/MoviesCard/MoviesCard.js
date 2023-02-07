import './MoviesCard.css';
import like from '../../images/like.svg';
import liked from '../../images/like-active.svg';
import deleteIcon from '../../images/delete.svg';
import { parseDuration } from '../../utils/helpers';

const MoviesCard = ({ name, image, duration, isLiked, isOwner }) => (
  <li className="movie">
    <div className="movie__info">
      <h2 className="movie__name">{name}</h2>
      <p className="movie__duration">{parseDuration(duration)}</p>
      <img
        className={`movie__button ${
          isOwner ? 'movie__button_state_delete' : 'movie__button_state_add'
        }`}
        src={isOwner ? deleteIcon : isLiked ? liked : like}
        alt={isOwner ? 'Удалить из коллекции' : 'Добавить в коллекцию'}
      />
    </div>
    <img className="movie__poster" src={image} alt="Постер к фильму" />
  </li>
);

export default MoviesCard;
