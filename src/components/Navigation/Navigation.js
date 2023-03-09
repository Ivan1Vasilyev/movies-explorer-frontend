import './Navigation.css';
import accountIcon from '../../images/account.svg';
import { Link } from 'react-router-dom';
import {
  ROUTE_MOVIES,
  ROUTE_SAVED_MOVIES,
  ROUTE_PROFILE,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_MAIN,
} from '../../utils/constants';
import { useEffect, useState } from 'react';

const Navigation = ({ loggedIn, isOpen, onClose, place }) => {
  const [currentPlace, setCurrentPlace] = useState({});

  useEffect(() => {
    if (place) setCurrentPlace({ [place]: true });
  }, [place]);

  return (
    <nav className={`nav${loggedIn ? ' nav_hidden' : ''}${isOpen ? ' nav_opened' : ''}`}>
      {isOpen && (
        <Link
          className={`nav__link${currentPlace[ROUTE_MAIN] ? ' nav__link_selected' : ''}`}
          to={ROUTE_MAIN}
          onClick={onClose}
        >
          Главная
        </Link>
      )}
      {loggedIn ? (
        <>
          <Link
            className={`nav__link${currentPlace[ROUTE_MOVIES] ? ' nav__link_selected' : ''}`}
            to={ROUTE_MOVIES}
            onClick={onClose}
          >
            Фильмы
          </Link>
          <Link
            className={`nav__link${currentPlace[ROUTE_SAVED_MOVIES] ? ' nav__link_selected' : ''}`}
            to={ROUTE_SAVED_MOVIES}
            onClick={onClose}
          >
            Сохранённые фильмы
          </Link>
          <Link className="nav__link nav__link_place_account" to={ROUTE_PROFILE} onClick={onClose}>
            <p
              className={`nav__link-text${
                currentPlace[ROUTE_PROFILE] ? ' nav__link-text_selected' : ''
              }`}
            >
              Аккаунт
            </p>

            <img className="nav__account-icon" src={accountIcon} alt="Иконка аккаунта"></img>
          </Link>
        </>
      ) : (
        <>
          <Link className="nav__link nav__link_place_register" to={ROUTE_SIGN_UP} onClick={onClose}>
            Регистрация
          </Link>
          <Link className="nav__link nav__link_place_login" to={ROUTE_SIGN_IN} onClick={onClose}>
            Войти
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
