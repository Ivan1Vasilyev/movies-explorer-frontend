import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { wordFilter, durationFilter, getAllMovies } from '../../utils/helpers';
import { ALL_MOVIES_KEY } from '../../utils/constants';

const Movies = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const storageKey = currentUser._id;
  const [loading, setLoading] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLikeMovie = async (movie) => {
    const response = await props.handleLikeMovie(movie);

    setFoundMoviesList(response.filter((item) => wordFilter(keyWord, item)));
  };

  useEffect(() => {
    if (localStorage.getItem(storageKey)) {
      const config = JSON.parse(localStorage.getItem(storageKey));
      setFilterOn(config.filterOn);
      setKeyWord(config.keyWord);
    }
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const allMovies = await getAllMovies(setLoading, props.getMovies, ALL_MOVIES_KEY);

      setFoundMoviesList(allMovies.filter((item) => wordFilter(keyWord, item)));
      setIsSubmitted(true);

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          filterOn,
          keyWord,
        }),
      );
    };
    if (keyWord !== '') getResult();
  }, [keyWord, filterOn]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={'movies'} />
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
            handleLikeMovie={handleLikeMovie}
            moviesData={filterOn ? foundMoviesList.filter(durationFilter) : foundMoviesList}
            isSubmitted={isSubmitted}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
