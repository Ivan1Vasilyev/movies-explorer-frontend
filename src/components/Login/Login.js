import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { ROUTE_SIGN_UP } from '../../utils/constants';
import Field from '../Field/Field';

const Login = () => {
  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      captionText="Ещё не зарегистрированы?"
      route={ROUTE_SIGN_UP}
      linkText="Регистрация"
    >
      <Field
        inputStyle="form__input"
        name="Email"
        type="email"
        label="E-mail"
        labelStyle="form__label"
        value="pochta@yandex.ru"
        errorStyle="form__error"
      />
      <Field
        inputStyle="form__input"
        name="password"
        type="password"
        label="Пароль"
        labelStyle="form__label"
        value="qwerty12345678"
        errorStyle="form__error"
      />
    </AuthForm>
  );
};

export default Login;
