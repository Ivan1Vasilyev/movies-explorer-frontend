import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { ROUTE_SIGN_UP } from '../../utils/constants';
import Field from '../Field/Field';
import useForm from '../../hooks/useForm';

const Login = (props) => {
  const { formik, disabled } = useForm({ email: '', password: '' }, props.onSubmit);
  const { touched, errors } = formik;

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      captionText="Ещё не зарегистрированы?"
      route={ROUTE_SIGN_UP}
      linkText="Регистрация"
      disabled={disabled}
    >
      <Field
        className={`form__input ${touched.email && errors.email && 'form__input_onError'}`}
        labelStyle="form__label"
        errorStyle="form__error"
        name="email"
        type="email"
        label="E-mail"
        formik={formik}
        placeHolder="Введите е-mail"
      />
      <Field
        className={`form__input ${touched.password && errors.password && 'form__input_onError'}`}
        labelStyle="form__label"
        errorStyle="form__error"
        name="password"
        type="password"
        label="Пароль"
        formik={formik}
        placeHolder="Введите пароль"
      />
    </AuthForm>
  );
};

export default Login;
