import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { ROUTE_SIGN_UP, ROUTE_MAIN } from '../../utils/constants';
import Field from '../Field/Field';
import useForm from '../../hooks/useForm';
import { Navigate } from 'react-router-dom';

const Login = ({ onSubmit, errorMessage, loggedIn }) => {
  const { formik, disabled } = useForm({ email: '', password: '' }, onSubmit);
  const { touched, errors } = formik;

  if (loggedIn) return <Navigate to={ROUTE_MAIN} />;

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      captionText="Ещё не зарегистрированы?"
      route={ROUTE_SIGN_UP}
      linkText="Регистрация"
      disabled={disabled}
      errorMessage={errorMessage}
      formik={formik}
    >
      <Field
        className={`form__input${touched.email && errors.email ? ' form__input_onError' : ''}`}
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
        className={`form__input${
          touched.password && errors.password ? ' form__input_onError' : ''
        }`}
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
