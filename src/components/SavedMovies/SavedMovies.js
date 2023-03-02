import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getAllSavedMovies, moviesFilter } from '../../utils/helpers';

const SavedMovies = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(false);
  const [isOnlyShorts, setIsOnlyShorts] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const deleteMovie = useCallback(async (movie) => {
    const response = await props.deleteMovie(movie);
    setFoundMoviesList((state) => state.filter((m) => m._id !== response._id));
  }, []);

  useEffect(() => {
    const getFirstResult = async () => {
      const allSavedMovies = await getAllSavedMovies(
        props.getSavedMovies,
        currentUser._id,
        setLoading,
      );
      setFoundMoviesList(allSavedMovies);
    };

    getFirstResult();
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const savedMovies = await getAllSavedMovies(
        props.getSavedMovies,
        currentUser._id,
        setLoading,
      );

      setFoundMoviesList(savedMovies.filter((movie) => moviesFilter(movie, keyWord, isOnlyShorts)));
      if (!isSubmitted && (keyWord || isOnlyShorts)) setIsSubmitted(true);
    };

    getResult();
  }, [keyWord, isOnlyShorts]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={'savedMovies'} />
      <main className="movies page__element">
        <SearchForm
          isOnlyShorts={isOnlyShorts}
          setIsOnlyShorts={setIsOnlyShorts}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
        />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isSaved={true}
            handleLikeMovie={deleteMovie}
            moviesData={foundMoviesList}
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
