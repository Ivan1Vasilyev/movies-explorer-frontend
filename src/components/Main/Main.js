import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = () => (
  <>
    <section className="main main_place_promo">
      <Header place="main" />
      <Promo />
    </section>
    <AboutProject />
    <section className="main main_place_tech" mutated={true}>
      <Techs />
    </section>
    <AboutMe />
    <Portfolio />
    <Footer />
  </>
);

export default Main;
