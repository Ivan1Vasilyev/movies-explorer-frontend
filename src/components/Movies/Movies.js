import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import { wordFilter, dataFilter } from '../../utils/helpers';

const Movies = ({ isButtonNeed, isOwner, place, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [foundMoviesList, setFoundMoviesList] = useState([]);
  const [shortMoviesList, setShortMoviesList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (filterOn) {
      setShortMoviesList(foundMoviesList.filter((movie) => movie.duration < 41));
    } else {
      setShortMoviesList([]);
    }
    // if (localStorage.has('last')) {
    //   const config = JSON.parse(localStorage.get(currentUser._id));
    //   setFilterOn(config.filterOn);
    //   setResultMoviesList(config.list);
    //   setKeyWord(config.keyWord);
    // }
  }, [filterOn, foundMoviesList]);

  useEffect(() => {
    const getResult = async () => {
      setLoading(true);
      const allMovies = await props.getMovies();
      setFoundMoviesList(allMovies.filter((item) => wordFilter(keyWord, item)).map(dataFilter));
      setLoading(false);
      setIsSubmitted(true);
    };
    if (keyWord !== '') getResult();
  }, [keyWord]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place={place || 'movies'} />
      <main className="movies page__element">
        <SearchForm filterOn={filterOn} setFilterOn={setFilterOn} setKeyWord={setKeyWord} />
        {loading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesData={filterOn ? shortMoviesList : foundMoviesList}
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
