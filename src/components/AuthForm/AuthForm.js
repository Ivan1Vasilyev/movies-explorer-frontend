import './AuthForm.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const AuthForm = (props) => (
  <form className="form page__element">
    <div className="form__fields">
      <Logo mixStyle="form__logo" />
      <h2 className="form__title">{props.title}</h2>
      {props.children}
    </div>
    <div className="form__submit-area">
      <button
        className={`form__submit-button ${props.disabled && 'form__submit-button_disabled'}`}
        type="submit"
        aria-label="Отправить данные"
        disabled={props.disabled}
      >
        {props.buttonText}
      </button>
      <p className="form__caption">
        {props.captionText}
        <Link to={props.route} className="form__link">
          {props.linkText}
        </Link>
      </p>
    </div>
  </form>
);

export default AuthForm;
