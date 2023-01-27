import { Route, Routes } from 'react-router-dom';
import Page from '../Page/Page';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP, ROUTE_PROFILE, ROUTE_MOVIES } from '../../utils/constants';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';

const App = () => {
  return (
    <Page>
      <Routes>
        <Route path={ROUTE_SIGN_UP} element={<Register />} />
        <Route path={ROUTE_SIGN_IN} element={<Login />} />
        <Route path={ROUTE_MOVIES} element={<Movies />} />
        <Route path={ROUTE_PROFILE} element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Page>
  );
};

export default App;
