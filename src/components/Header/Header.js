import './Header.css';
import { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggler = () => setIsMenuOpen((state) => !state);
  useEffect(() => {
    if (!props.loggedIn) setIsMenuOpen(false);
  }, [props.loggedIn]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const debounce = () => {
      let isCooldown = false;

      return (e) => {
        if (isCooldown) return;
        if (e.target.innerWidth > 768) setIsMenuOpen(false);
        isCooldown = true;
        setTimeout(() => (isCooldown = false), 100);
      };
    };
    const sizeListener = debounce();
    window.addEventListener('resize', sizeListener);
    return () => window.removeEventListener('resize', sizeListener);
  }, [isMenuOpen]);
  return (
    <header className={`header ${isMenuOpen && 'header_obscured'} page__element`}>
      <Logo />
      <Navigation loggedIn={props.loggedIn} isOpen={isMenuOpen} />
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
