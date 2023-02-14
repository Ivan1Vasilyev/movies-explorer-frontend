import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { wordFilter, durationFilter, getAllDefaultMovies, updateLikes } from '../../utils/helpers';

const Movies = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const storageKey = currentUser._id;
  const [loading, setLoading] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
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
      setIsFilterOn(config.isFilterOn);
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
      setFoundMoviesList(allMovies.filter((item) => wordFilter(keyWord, item)));

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          isFilterOn,
          keyWord,
        }),
      );
    };
    if (keyWord !== '') getResult();
  }, [keyWord, isFilterOn]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={'movies'} />
      <main className="movies page__element">
        <SearchForm
          isFilterOn={isFilterOn}
          setIsFilterOn={setIsFilterOn}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
          key={Date.now()}
        />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            handleLikeMovie={handleLikeMovie}
            moviesData={isFilterOn ? foundMoviesList.filter(durationFilter) : foundMoviesList}
            isSubmitted={isSubmitted}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
