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
  const [filterOn, setFilterOn] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const deleteMovie = useCallback(async (movie) => {
    const response = await props.deleteMovie(movie);
    setFoundMoviesList((state) => state.filter((m) => m._id !== response._id)); //TODO !!!
  }, []);

  useEffect(() => {
    const getFirstResult = async () => {
      setLoading(true);

      const defaultMovies = await props.getSavedMovies();
      localStorage.setItem(allSavedMoviesKey, JSON.stringify(defaultMovies));
      setFoundMoviesList(defaultMovies);

      setLoading(false);
    };

    getFirstResult();
  }, []);

  useEffect(() => {
    const getResult = () => {
      const allMovies = JSON.parse(localStorage.getItem(allSavedMoviesKey));

      setFoundMoviesList(
        keyWord ? allMovies.filter((item) => wordFilter(keyWord, item)) : allMovies,
      );
    };

    if (keyWord !== '') getResult();
    setIsSubmitted(true);
  }, [keyWord, filterOn]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={'savedMovies'} />
      <main className="movies page__element">
        <SearchForm
          filterOn={filterOn}
          setFilterOn={setFilterOn}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
          key={Date.now()}
        />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isSaved={true}
            deleteMovie={deleteMovie}
            moviesData={filterOn ? foundMoviesList.filter(durationFilter) : foundMoviesList}
            isSubmitted={isSubmitted}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
