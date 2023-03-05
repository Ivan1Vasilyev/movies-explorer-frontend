import { Navigate } from 'react-router-dom';
import { ROUTE_MAIN } from '../../utils/constants';

const ProtectedRoute = ({ component: Component, ...props }) =>
  props.loggedIn ? <Component {...props} /> : <Navigate to={ROUTE_MAIN} />;

export default ProtectedRoute;
