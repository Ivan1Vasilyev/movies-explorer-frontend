import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { wordFilter, dataFilter } from '../../utils/helpers';

const Movies = ({ isOwner, place, ...props }) => {
  const currentUser = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addMovie = useCallback((movie) => {
    props.addMovie();
    const addingMovie = movie;
    if (addingMovie.owner === currentUser._id) {
      addingMovie.owner = null;
    } else {
      addingMovie.owner = currentUser._id;
    }
    setFoundMoviesList((state) =>
      state.map((m) => (m.movieId === movie.movieId ? addingMovie : m)),
    );
  }, []);

  useEffect(() => {
    if (localStorage.getItem(currentUser._id)) {
      const config = JSON.parse(localStorage.getItem(currentUser._id));
      setFilterOn(config.filterOn);
      setKeyWord(config.keyWord);
    }
  }, []);

  useEffect(() => {
    const getResult = async () => {
      if (!localStorage.getItem('allMovies')) {
        setLoading(true);
        localStorage.setItem('allMovies', JSON.stringify(await props.getMovies()));
        setLoading(false);
      }

      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      setFoundMoviesList(allMovies.filter((item) => wordFilter(keyWord, item)).map(dataFilter));

      if (filterOn) {
        setFoundMoviesList((state) => state.filter((movie) => movie.duration < 41));
      }
      setIsSubmitted(true);

      localStorage.setItem(
        currentUser._id,
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
      <Header loggedIn={props.loggedIn} place={place || 'movies'} />
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
            addMovie={addMovie}
            moviesData={foundMoviesList}
            isOwner={isOwner}
            isSubmitted={isSubmitted}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
