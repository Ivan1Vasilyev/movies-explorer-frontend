import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getAllDefaultMovies, updateLikes, moviesFilter } from '../../utils/helpers';

const Movies = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const storageKey = currentUser._id;
  const [loading, setLoading] = useState(false);
  const [isOnlyShorts, setIsOnlyShorts] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLikeMovie = useCallback(async (movie) => {
    const response = await props.handleLikeMovie(movie);
    setFoundMoviesList((state) =>
      state.map((m) => (m.movieId === response.movieId ? response : m)),
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      const config = JSON.parse(localStorage.getItem(storageKey));
      setIsOnlyShorts(config.isOnlyShorts);
      setKeyWord(config.keyWord);
    }
  }, []);

  useEffect(() => {
    const getResult = async () => {
      if (!isSubmitted) {
        await updateLikes(props.getDefaultMovies, props.getSavedMovies, currentUser._id);
        setIsSubmitted(true);
      }

      const allMovies = await getAllDefaultMovies(props.getDefaultMovies, setLoading);
      setFoundMoviesList(allMovies.filter((movie) => moviesFilter(movie, keyWord, isOnlyShorts)));

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          isOnlyShorts,
          keyWord,
        }),
      );
    };
    if (keyWord !== '') getResult();
  }, [keyWord, isOnlyShorts]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={'movies'} />
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
            handleLikeMovie={handleLikeMovie}
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

export default Movies;
