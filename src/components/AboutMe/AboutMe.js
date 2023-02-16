import './AboutMe.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';
import foto from '../../images/me.jpg';

const AboutMe = () => (
  <section className="about-me page__element">
    <TitleWithLine text="Студент" />
    <article className="about-me__container">
      <img className="about-me__photo" src={foto} alt="Фото автора сайта. Очень красивый."></img>
      <h3 className="about-me__name">Иван</h3>
      <p className="about-me__spec">Фронтенд-разработчик, 35 лет</p>
      <p className="about-me__discription">
        Я&nbsp;родился и&nbsp;живу в&nbsp;Электростали, закончил политехнический колледж
        по&nbsp;специальности Автоматизация технологических процессов, затем закончил факультет
        юриспруденции МФПА. Юристом я&nbsp;не&nbsp;стал и, отслужив в&nbsp;армии, продолжил
        трудиться по&nbsp;первой специальности. В&nbsp;2021 году заинтересовался{' '}
        <nobr>веб-разработкой</nobr>, постепенно знакомился с&nbsp;этим ремеслом по&nbsp;открытым
        источникам. В&nbsp;2022 году твёрдо решил сменить профессию и&nbsp;начал своё обучение
        на&nbsp;курсе Яндекс Практикума. В&nbsp;этом проекте я&nbsp;постарался наилучшим образом
        применить все полученные навыки.
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
