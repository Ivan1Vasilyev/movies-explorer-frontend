import { Route, Routes } from 'react-router-dom';
import Page from '../Page/Page';
import Register from '../Register/Register';
import Login from '../Login/Login';
import {
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
  ROUTE_PROFILE,
  ROUTE_MOVIES,
  ROUTE_SAVED_MOVIES,
} from '../../utils/constants';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import { moviesData } from '../../utils/constants';
import { useState } from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Page>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path={ROUTE_SIGN_UP} element={<Register />} />
        <Route path={ROUTE_SIGN_IN} element={<Login />} />
        <Route path={ROUTE_PROFILE} element={<Profile />} />
        <Route
          path={ROUTE_MOVIES}
          element={<Movies moviesData={moviesData} isButtonNeed={true} />}
        />
        <Route
          path={ROUTE_SAVED_MOVIES}
          element={<SavedMovies moviesData={moviesData.filter((_, i) => i < 3)} isOwner={true} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Page>
  );
};

export default App;
