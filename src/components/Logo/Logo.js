import './Logo.css';
import logo from '../../images/logo.svg';
import { ROUTE_MAIN } from '../../utils/constants';
import { Link } from 'react-router-dom';

const Logo = ({ mixStyle }) => (
  <Link to={ROUTE_MAIN} className={`logo${mixStyle ? ` ${mixStyle}` : ''}`}>
    <img className="logo__image" src={logo} alt="logo" />
  </Link>
);

export default Logo;
