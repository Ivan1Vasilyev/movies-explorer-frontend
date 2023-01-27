import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Logo = ({ mixStyle }) => (
  <Link to="/" className={`logo ${mixStyle}`}>
    <img className="logo__image" src={logo} alt="logo" />
  </Link>
);

export default Logo;
