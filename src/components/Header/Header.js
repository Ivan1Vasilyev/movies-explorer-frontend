import './Header.css';
import { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { debounce } from '../../utils/helpers';
import { CHANGE_HEADER_WIDTH } from '../../utils/constants';

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggler = () => setIsMenuOpen((state) => !state);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const sizeListener = debounce(CHANGE_HEADER_WIDTH, setIsMenuOpen, false);
    window.addEventListener('resize', sizeListener);

    return () => window.removeEventListener('resize', sizeListener);
  }, [isMenuOpen]);

  return (
    <header className={`header page__element`}>
      <div
        className={`header__overlay ${isMenuOpen && 'header__overlay_opened'}`}
        onClick={closeMenu}
      />
      <Logo />
      <Navigation
        loggedIn={props.loggedIn}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        place={props.place}
      />
      {props.loggedIn && (
        <button className={`header__menu ${isMenuOpen && 'header__menu_active'}`} onClick={toggler}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
    </header>
  );
};

export default Header;
