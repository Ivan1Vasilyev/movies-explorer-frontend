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
  LOAD_MOVIES_ERROR_MESSAGE,
  TOKEN_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from '../../utils/constants';
import { useCallback, useEffect, useState } from 'react';
import * as MainApi from '../../utils/MainApi';
import getMovies from '../../utils/MoviesApi';
import {
  handleError,
  adaptDataToDB,
  getMoviesId,
  updateAllMovies,
  removeSavedMovieFromStore,
  addSavedMovieToStore,
} from '../../utils/helpers';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const apiWrapper = (callback, customErrorMessage) => async (data) => {
    try {
      if (errorMessage) setErrorMessage('');
      const response = await callback(data);
      return response;
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(customErrorMessage || message);
    }
  };

  const authIn = (method) => async (userData) => {
    const response = await method(userData);
    setCurrentUser({ ...response });
    setLoggedIn(true);
    navigate(ROUTE_MOVIES);
  };

  const register = apiWrapper((userData) => authIn(MainApi.register)(userData));

  const login = apiWrapper((userData) => authIn(MainApi.login)(userData));

  const updateUser = apiWrapper(async (data) => {
    const response = await MainApi.updateUser(data);
    setCurrentUser((state) => ({ ...state, ...response }));
  });

  const logout = apiWrapper(async () => {
    await MainApi.logout({ _id: currentUser._id });
    setCurrentUser({});
    setLoggedIn(false);
  });

  const getDefaultMovies = apiWrapper(async () => {
    const response = await getMovies();
    if (errorMessage) setErrorMessage('');
    return response;
  }, LOAD_MOVIES_ERROR_MESSAGE);

  const getSavedMovies = apiWrapper(async () => {
    const response = await MainApi.getMovies();
    if (errorMessage) setErrorMessage('');
    return response;
  }, LOAD_MOVIES_ERROR_MESSAGE);

  const deleteSavedMovie = apiWrapper(
    useCallback(
      async (movie) => {
        const deletingMovie = await MainApi.deleteMovie(movie._id);
        await removeSavedMovieFromStore(deletingMovie, currentUser._id, getSavedMovies);
        await updateAllMovies(deletingMovie, getDefaultMovies, currentUser._id);
        return deletingMovie;
      },
      [currentUser._id],
    ),
  );

  const deleteMovie = async (movie) => {
    const movieId = await getMoviesId(movie.movieId, getSavedMovies, currentUser._id);
    const deletingMovie = await MainApi.deleteMovie(movieId);
    await removeSavedMovieFromStore(deletingMovie, currentUser._id, getSavedMovies);
    movie.owners = movie.owners.filter((m) => m !== currentUser._id);
    return movie;
  };

  const addMovie = async (movie) => {
    const addingMovie = await MainApi.addMovie(adaptDataToDB(movie, currentUser._id));
    await addSavedMovieToStore(addingMovie, currentUser._id, getSavedMovies);
    movie.owners.push(currentUser._id);
    return movie;
  };

  const handleLikeMovie = apiWrapper(async (movie) => {
    const response = movie.owners.includes(currentUser._id)
      ? await deleteMovie(movie)
      : await addMovie(movie);

    const allMovies = JSON.parse(localStorage.getItem(ALL_MOVIES_KEY)).map((m) =>
      m.movieId === response.movieId ? response : m,
    );
    localStorage.setItem(ALL_MOVIES_KEY, JSON.stringify(allMovies));

    return response;
  }, SERVER_ERROR_MESSAGE);

  const checkToken = apiWrapper(
    useCallback(async () => {
      const user = await MainApi.getUserInfo();
      setCurrentUser(user);
      setLoggedIn(true);
      navigate(pathname);
    }, [pathname]),
    TOKEN_ERROR_MESSAGE,
  );

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
                getDefaultMovies={getDefaultMovies}
                getSavedMovies={getSavedMovies}
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
                errorMessage={errorMessage}
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
