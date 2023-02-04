import { Route, Routes } from 'react-router-dom';
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
} from '../../utils/constants';
import { moviesData } from '../../utils/constants';
import { useEffect, useState } from 'react';
import * as api from '../../utils/api';
import { handleError } from '../../utils/helpers';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const authIn = (method) => async (userData) => {
    try {
      const res = await method(userData);
      setCurrentUser({ ...res });
      setLoggedIn(true);
      if (errorMessage) setErrorMessage('');
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const register = authIn(api.register);

  const login = authIn(api.login);

  const updateUser = async (data) => {
    try {
      const res = await api.updateUser(data);
      setCurrentUser((state) => ({ ...state, ...res }));
      if (errorMessage) setErrorMessage('');
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const logout = async () => {
    try {
      await api.logout({ _id: currentUser._id });
      setCurrentUser({});
      setLoggedIn(false);
    } catch (err) {
      const message = await handleError(err);
      setErrorMessage(message);
    }
  };

  const checkToken = async () => {
    try {
      const user = await api.getUserInfo();
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (err) {
      handleError(err, 'Ошибка проверки токена');
    }
  };

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
            exact
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
          <Route
            path={ROUTE_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                moviesData={moviesData}
                isButtonNeed={true}
              />
            }
          />
          <Route
            path={ROUTE_SAVED_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                moviesData={moviesData.filter((_, i) => i < 3)}
                isOwner={true}
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
