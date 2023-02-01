import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = ({ moviesData, isButtonNeed, isOwner, place }) => {
  return (
    <>
      <Header loggedIn={true} place={place || 'movies'} />
      <main className="movies page__element">
        <SearchForm />
        <MoviesCardList moviesData={moviesData} isButtonNeed={isButtonNeed} isOwner={isOwner} />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
