import './AuthForm.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import useErrorShielding from '../../hooks/useErrorShielding';

const AuthForm = (props) => {
  const { isSubmitted, handleSubmit } = useErrorShielding(props.formik);

  return (
    <form className="form page__element" onSubmit={handleSubmit}>
      <div className="form__fields">
        <Logo mixStyle="form__logo" />
        <h2 className="form__title">{props.title}</h2>
        {props.children}
      </div>
      <div className="form__submit-area">
        <p className="form__submit-error">{isSubmitted && props.errorMessage}</p>
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
};

export default AuthForm;
