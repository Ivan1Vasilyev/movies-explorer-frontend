import './MoviesCard.css';
import like from '../../images/like.svg';
import liked from '../../images/like-active.svg';
import deleteIcon from '../../images/delete.svg';
import { parseDuration } from '../../utils/helpers';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

const MoviesCard = ({ data, handleLikeMovie, deleteMovie, isSaved }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = isSaved ? false : data.owners?.includes(currentUser._id);

  return (
    <li className="movie">
      <div className="movie__info">
        <h2 className="movie__name">{data.nameRU}</h2>
        <p className="movie__duration">{parseDuration(data.duration)}</p>
        <img
          className={`movie__button ${
            isSaved ? 'movie__button_state_delete' : 'movie__button_state_add'
          }`}
          src={isSaved ? deleteIcon : isLiked ? liked : like}
          alt={isSaved ? 'Удалить из коллекции' : 'Добавить в коллекцию'}
          onClick={handleLikeMovie ? () => handleLikeMovie(data) : () => deleteMovie(data)}
        />
      </div>
      <img className="movie__poster" src={data.image} alt="Постер к фильму" />
    </li>
  );
};

export default MoviesCard;
