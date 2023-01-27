import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer page__element">
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
