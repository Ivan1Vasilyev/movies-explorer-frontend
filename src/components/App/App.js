import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Page from '../Page/Page';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_PROFILE,
  ROUTE_MOVIES,
  ROUTE_SAVED_MOVIES,
  ALL_MOVIES_KEY,
} from '../../utils/constants';
import { useCallback, useEffect, useState } from 'react';
import * as MainApi from '../../utils/MainApi';
import getMovies from '../../utils/MoviesApi';
import { handleError, adaptDataToDB, getMoviesId, updateAllMoves } from '../../utils/helpers';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const authIn = (method) => async (userData) => {
    try {
      const res = await method(userData);
      setCurrentUser({ ...res });
      setLoggedIn(true);
      if (errorMessage) setErrorMessage('');
      navigate(ROUTE_MOVIES);
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const register = authIn(MainApi.register);

  const login = authIn(MainApi.login);

  const updateUser = async (data) => {
    try {
      const res = await MainApi.updateUser(data);
      setCurrentUser((state) => ({ ...state, ...res }));
      if (errorMessage) setErrorMessage('');
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const logout = async () => {
    try {
      await MainApi.logout({ _id: currentUser._id });
      setCurrentUser({});
      setLoggedIn(false);
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const getDefaultMovies = async () => {
    try {
      const response = await getMovies();
      return response;
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const getSavedMovies = async () => {
    try {
      const response = await MainApi.getMovies();
      return response;
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const deleteMovie = async (movie) => {
    try {
      const movieId = await getMoviesId(movie.movieId, getSavedMovies);
      await MainApi.deleteMovie(movieId);
      movie.owners = movie.owners.filter((m) => m !== currentUser._id);
      return movie;
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const deleteSavedMovie = async (movie) => {
    try {
      const deletingMovie = await MainApi.deleteMovie(movie._id);
      await updateAllMoves(getDefaultMovies, deletingMovie, currentUser._id);
      return deletingMovie;
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const addMovie = async (movie) => {
    try {
      await MainApi.addMovie(adaptDataToDB(movie, currentUser._id));
      movie.owners.push(currentUser._id);
      return movie;
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const handleLikeMovie = async (movie) => {
    // localStorage.clear();
    const response = movie.owners.includes(currentUser._id)
      ? await deleteMovie(movie)
      : await addMovie(movie);

    const newAllMovies = JSON.parse(localStorage.getItem(ALL_MOVIES_KEY)).map((m) =>
      m.movieId === response.movieId ? response : m,
    );
    localStorage.setItem(ALL_MOVIES_KEY, JSON.stringify(newAllMovies));

    return response;
  };

  const checkToken = useCallback(async () => {
    try {
      const user = await MainApi.getUserInfo();
      setCurrentUser(user);
      setLoggedIn(true);
      navigate(pathname);
    } catch (err) {
      handleError(err, 'Ошибка проверки токена');
    }
  }, [pathname]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Page>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path={ROUTE_SIGN_UP}
            element={
              <Register onSubmit={register} errorMessage={errorMessage} loggedIn={loggedIn} />
            }
          />
          <Route
            path={ROUTE_SIGN_IN}
            element={<Login onSubmit={login} errorMessage={errorMessage} loggedIn={loggedIn} />}
          />
          <Route
            path={ROUTE_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                handleLikeMovie={handleLikeMovie}
                getMovies={getDefaultMovies}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path={ROUTE_SAVED_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                getSavedMovies={getSavedMovies}
                deleteMovie={deleteSavedMovie}
                isOwner={true}
              />
            }
          />
          <Route
            path={ROUTE_PROFILE}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                onLogout={logout}
                onSubmit={updateUser}
                errorMessage={errorMessage}
              />
            }
          />
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </Page>
  );
};

export default App;
