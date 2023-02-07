import './AboutMe.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';
import foto from '../../images/not-me.jpg';

const AboutMe = () => (
  <section className="about-me page__element">
    <TitleWithLine text="Студент" />
    <article className="about-me__container">
      <img className="about-me__photo" src={foto} alt="Фото автора сайта. Очень красивый."></img>
      <h3 className="about-me__name">Виталий</h3>
      <p className="about-me__spec">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__discription">
        Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня
        есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно
        начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того,
        как прошёл курс по&nbsp;<nobr>веб-разработке</nobr>, начал заниматься{' '}
        <nobr>фриланс-заказами</nobr> и&nbsp;ушёл с&nbsp;постоянной работы
      </p>
      <a
        className="about-me__link"
        href="https://github.com/Ivan1Vasilyev"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </article>
  </section>
);

export default AboutMe;
