import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

const Movies = ({ moviesData, isButtonNeed, isOwner, place }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>
      <Header loggedIn={true} place={place || 'movies'} />
      <main className="movies page__element">
        <SearchForm />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList moviesData={moviesData} isButtonNeed={isButtonNeed} isOwner={isOwner} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
