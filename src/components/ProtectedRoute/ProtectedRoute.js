import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) =>
  props.loggedIn ? <Component {...props} /> : <Navigate to="/" />;

export default ProtectedRoute;
