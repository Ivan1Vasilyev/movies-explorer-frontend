import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { ROUTE_SIGN_UP } from '../../utils/constants';
import Field from '../Field/Field';
import useForm from '../../hooks/useForm';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const { formik, disabled } = useForm({ email: '', password: '' }, props.onSubmit);
  const { touched, errors, handleSubmit } = formik;

  if (props.loggedIn) return <Navigate to="/" />;

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      captionText="Ещё не зарегистрированы?"
      route={ROUTE_SIGN_UP}
      linkText="Регистрация"
      disabled={disabled}
      errorMessage={props.errorMessage}
      onSubmit={handleSubmit}
    >
      <Field
        className={`form__input ${touched.email && errors.email && 'form__input_onError'}`}
        labelStyle="form__label"
        errorStyle="form__error"
        name="email"
        type="email"
        label="E-mail"
        formik={formik}
        placeholder="Введите е-mail"
        autoComplete="email"
      />
      <Field
        className={`form__input ${touched.password && errors.password && 'form__input_onError'}`}
        labelStyle="form__label"
        errorStyle="form__error"
        name="password"
        type="password"
        label="Пароль"
        formik={formik}
        placeholder="Введите пароль"
        autoComplete="current-password"
      />
    </AuthForm>
  );
};

export default Login;
