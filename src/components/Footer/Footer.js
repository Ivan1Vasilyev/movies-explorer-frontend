import './Footer.css';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_PROFILE } from '../../utils/constants';
import { useEffect, useState } from 'react';

const Footer = ({ place }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (place === ROUTE_SIGN_IN || place === ROUTE_SIGN_UP || place === ROUTE_PROFILE) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [place]);

  return (
    <footer className={`footer page__element${isHidden ? ' footer_hidden' : ''}`}>
      <p className="footer__capture">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__underline">
        <p className="footer__year">© {new Date().getFullYear()}</p>
        <nav className="footer__links">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
