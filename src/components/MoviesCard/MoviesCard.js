import './MoviesCard.css';
import like from '../../images/like.svg';
import liked from '../../images/like-active.svg';
import deleteIcon from '../../images/delete.svg';
import { parseDuration } from '../../utils/helpers';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

const MoviesCard = ({ data, addMovie, isOwner }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = data.owners.includes(currentUser._id);

  return (
    <li className="movie">
      <div className="movie__info">
        <h2 className="movie__name">{data.nameRU}</h2>
        <p className="movie__duration">{parseDuration(data.duration)}</p>
        <img
          className={`movie__button ${
            isOwner ? 'movie__button_state_delete' : 'movie__button_state_add'
          }`}
          src={isOwner ? deleteIcon : isLiked ? liked : like}
          alt={isOwner ? 'Удалить из коллекции' : 'Добавить в коллекцию'}
          onClick={() => addMovie(data)}
        />
      </div>
      <img className="movie__poster" src={data.image} alt="Постер к фильму" />
    </li>
  );
};

export default MoviesCard;
