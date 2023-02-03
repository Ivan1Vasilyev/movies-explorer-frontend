import './Register.css';
import { ROUTE_SIGN_IN } from '../../utils/constants';
import Field from '../Field/Field';
import AuthForm from '../AuthForm/AuthForm';
import useForm from '../../hooks/useForm';

const Register = (props) => {
  const { formik, disabled } = useForm({ name: '', email: '', password: '' }, props.onSubmit);
  const { touched, errors } = formik;

  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      captionText="Уже зарегистрированы?"
      route={ROUTE_SIGN_IN}
      linkText="Войти"
      disabled={disabled}
    >
      <Field
        className={`form__input ${touched.name && errors.name && 'form__input_onError'}`}
        labelStyle="form__label"
        errorStyle="form__error"
        name="name"
        type="text"
        label="Имя"
        formik={formik}
        placeholder="Введите имя"
      />
      <Field
        className={`form__input ${touched.email && errors.email && 'form__input_onError'}`}
        labelStyle="form__label"
        errorStyle="form__error"
        name="email"
        type="email"
        label="E-mail"
        formik={formik}
        placeholder="Введите е-mail"
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
      />
    </AuthForm>
  );
};

export default Register;
