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
import { useState } from 'react';

const Navigation = ({ loggedIn, isOpen }) => {
  const [selected, setSelected] = useState(true);

  return (
    <nav className={`nav ${isOpen && 'nav_opened'}`}>
      {loggedIn ? (
        <>
          {isOpen && (
            <Link className="nav__link" to="/">
              Главная
            </Link>
          )}
          <Link className={`nav__link ${selected && 'nav__link_selected'}`} to={ROUTE_MOVIES}>
            Фильмы
          </Link>
          <Link
            className={`nav__link ${!isOpen && 'nav__link_place_saved-movies'}`}
            to={ROUTE_SAVED_MOVIES}
          >
            Сохранённые фильмы
          </Link>
          <Link className={`nav__link nav__link_place_account`} to={ROUTE_PROFILE}>
            Аккаунт
            <img className="nav__account-icon" src={accountIcon} alt="Иконка аккаунта"></img>
          </Link>
        </>
      ) : (
        <>
          <Link className="nav__link" to={ROUTE_SIGN_UP}>
            Регистрация
          </Link>
          <Link className="nav__link" to={ROUTE_SIGN_IN}>
            Войти
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
