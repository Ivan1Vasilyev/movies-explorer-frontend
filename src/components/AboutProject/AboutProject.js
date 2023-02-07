import './AboutProject.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';

const AboutProject = () => (
  <section className="about page__element" id="about">
    <TitleWithLine text="О проекте" />
    <div className="about__description">
      <div className="about__part">
        <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about__paragraph">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
          доработки.
        </p>
      </div>
      <div className="about__part">
        <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about__paragraph">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
          защититься.
        </p>
      </div>
    </div>
    <div className="about__chart">
      <p className="about__chart-text about__chart-text_place_week">1 неделя</p>
      <p className="about__chart-text about__chart-text_place_weeks">4 недели</p>
      <p className="about__chart-text about__chart-text_place_spec">Back-end</p>
      <p className="about__chart-text about__chart-text_place_spec">Front-end</p>
    </div>
  </section>
);

export default AboutProject;
