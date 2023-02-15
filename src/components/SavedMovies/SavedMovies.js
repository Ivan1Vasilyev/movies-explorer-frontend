import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { wordFilter, durationFilter, getAllSavedMoviesKey } from '../../utils/helpers';

const SavedMovies = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const allSavedMoviesKey = getAllSavedMoviesKey(currentUser._id);
  const [loading, setLoading] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const deleteMovie = useCallback(async (movie) => {
    const response = await props.deleteMovie(movie);
    setFoundMoviesList((state) => state.filter((m) => m._id !== response._id));
  }, []);

  useEffect(() => {
    const getFirstResult = async () => {
      setLoading(true);

      const allSavedMovies = await props.getSavedMovies();
      localStorage.setItem(allSavedMoviesKey, JSON.stringify(allSavedMovies));
      setFoundMoviesList(allSavedMovies);

      setLoading(false);
    };

    getFirstResult();
  }, []);

  useEffect(() => {
    const getResult = () => {
      const allSavedMovies = JSON.parse(localStorage.getItem(allSavedMoviesKey));
      setFoundMoviesList(allSavedMovies.filter((item) => wordFilter(keyWord, item)));
      if (!isSubmitted) setIsSubmitted(true);
    };

    if (keyWord !== '') getResult();
  }, [keyWord]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={'savedMovies'} />
      <main className="movies page__element">
        <SearchForm
          isFilterOn={isFilterOn}
          setIsFilterOn={setIsFilterOn}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
        />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isSaved={true}
            deleteMovie={deleteMovie}
            moviesData={isFilterOn ? foundMoviesList.filter(durationFilter) : foundMoviesList}
            isSubmitted={isSubmitted}
            errorMessage={props.errorMessage}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
