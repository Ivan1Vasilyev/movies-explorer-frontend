import './Promo.css';
import planet from '../../images/planet.svg';

const Promo = () => (
  <section className="promo page__element">
    <img className="promo__image" src={planet} alt="Планета, нарисованная буквами WEB" />
    <h1 className="promo__title">
      Учебный проект студента факультета <span className="promo__no-wrap">Веб-разработки.</span>
    </h1>
    <p className="promo__paragraph">
      Листайте ниже, чтобы узнать больше про этот проект и его создателя.
    </p>
    <a href="/#about" className="promo__link">
      <span className="promo__link-text">Узнать больше</span>
    </a>
  </section>
);

export default Promo;
