import './Header.css';
import { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { debounce } from '../../utils/helpers';
import {
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_MAIN,
  CHANGE_HEADER_WIDTH,
} from '../../utils/constants';

const Header = ({ place, loggedIn }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggler = () => setIsMenuOpen((state) => !state);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (place === ROUTE_SIGN_IN || place === ROUTE_SIGN_UP) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    if (place === ROUTE_MAIN) {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [place]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const sizeListener = debounce(CHANGE_HEADER_WIDTH, setIsMenuOpen, false);
    window.addEventListener('resize', sizeListener);

    return () => window.removeEventListener('resize', sizeListener);
  }, [isMenuOpen]);

  return (
    <header
      className={`header${isHidden ? ' header_hidden' : ''}${isMain ? ' header_place_main' : ''}`}
    >
      <div
        className={`header__overlay${isMenuOpen ? ' header__overlay_opened' : ''}`}
        onClick={closeMenu}
      />
      <div className="header__nav page__element">
        <Logo />
        <Navigation loggedIn={loggedIn} isOpen={isMenuOpen} onClose={closeMenu} place={place} />
        {loggedIn && (
          <button
            className={`header__menu${isMenuOpen ? ' header__menu_active' : ''}`}
            onClick={toggler}
            type="button"
            aria-label={isMenuOpen ? ' Закрыть меню' : 'Открыть меню'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
