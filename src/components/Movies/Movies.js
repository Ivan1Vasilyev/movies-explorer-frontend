import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Container from '../Container/Container';

const Movies = ({ moviesData, isButtonNeed, isOwner }) => {
  return (
    <Container loggedIn={true}>
      <main className="movies page__element">
        <SearchForm />
        <MoviesCardList moviesData={moviesData} isButtonNeed={isButtonNeed} isOwner={isOwner} />
      </main>
    </Container>
  );
};

export default Movies;
