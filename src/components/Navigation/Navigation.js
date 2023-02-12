import './Navigation.css';
import accountIcon from '../../images/account.svg';
import { Link } from 'react-router-dom';
import {
  ROUTE_MOVIES,
  ROUTE_SAVED_MOVIES,
  ROUTE_PROFILE,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from '../../utils/constants';
import { useEffect, useState } from 'react';

const Navigation = ({ loggedIn, isOpen, onClose, place }) => {
  const [currentPlace, setCurrentPlace] = useState({
    movies: false,
    savedMovies: false,
    account: false,
    main: false,
  });

  useEffect(() => {
    if (place) setCurrentPlace({ [place]: true });
  }, [place]);

  return (
    <>
      {loggedIn ? (
        <nav className={`nav nav_hidden ${isOpen && 'nav_opened'}`}>
          {isOpen && (
            <Link
              className={`nav__link ${currentPlace.main && 'nav__link_selected'}`}
              to="/"
              onClick={onClose}
            >
              Главная
            </Link>
          )}
          <Link
            className={`nav__link ${currentPlace.movies && 'nav__link_selected'}`}
            to={ROUTE_MOVIES}
            onClick={onClose}
          >
            Фильмы
          </Link>
          <Link
            className={`nav__link ${currentPlace.savedMovies && 'nav__link_selected'}`}
            to={ROUTE_SAVED_MOVIES}
            onClick={onClose}
          >
            Сохранённые фильмы
          </Link>
          <Link
            className={`nav__link nav__link_place_account ${
              currentPlace.account && 'nav__link_selected'
            }`}
            to={ROUTE_PROFILE}
            onClick={onClose}
          >
            Аккаунт
            <img className="nav__account-icon" src={accountIcon} alt="Иконка аккаунта"></img>
          </Link>
        </nav>
      ) : (
        <nav className="nav">
          <Link className="nav__link nav__link_place_register" to={ROUTE_SIGN_UP} onClick={onClose}>
            Регистрация
          </Link>
          <Link className="nav__link nav__link_place_login" to={ROUTE_SIGN_IN} onClick={onClose}>
            Войти
          </Link>
        </nav>
      )}
    </>
  );
};

export default Navigation;
