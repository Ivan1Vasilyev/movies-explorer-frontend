import './Portfolio.css';

const Portfolio = () => (
  <section className="portfolio page__element">
    <h2 className="portfolio__title">Портфолио</h2>
    <ul className="portfolio__container">
      <li className="portfolio__item">
        <a
          className="portfolio__link"
          href="https://github.com/Ivan1Vasilyev/how-to-learn"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p className="portfolio__text">Статичный сайт</p>
          <p className="portfolio__arrow">↗</p>
        </a>
      </li>
      <li className="portfolio__item">
        <a
          className="portfolio__link"
          href="https://github.com/Ivan1Vasilyev/russian-travel"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p className="portfolio__text">Адаптивный сайт</p>
          <p className="portfolio__arrow">↗</p>
        </a>
      </li>
      <li className="portfolio__item">
        <a
          className="portfolio__link"
          href="https://github.com/Ivan1Vasilyev/react-mesto-api-full"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p className="portfolio__text">Одностраничное приложение</p>
          <p className="portfolio__arrow">↗</p>
        </a>
      </li>
    </ul>
  </section>
);

export default Portfolio;
