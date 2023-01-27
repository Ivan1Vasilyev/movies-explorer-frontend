import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = () => {
  return (
    <>
      <Header loggedIn={true} />
      <main className="movies"></main>
      <Footer />
    </>
  );
};

export default Movies;
