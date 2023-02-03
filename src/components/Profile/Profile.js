import './Profile.css';
import Field from '../Field/Field';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

const Profile = (props) => {
  const { formik, disabled } = useForm({ name: '', email: '', password: '' }, props.onSubmit);
  const { touched, errors } = formik;

  return (
    <>
      <Header loggedIn={true} place="account" />
      <form className="profile page__element">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <Field
          className={`profile__input ${touched.name && errors.name && 'profile__input_onError'}`}
          labelStyle="profile__label"
          errorStyle="profile__error"
          name="name"
          type="text"
          label="Имя"
          formik={formik}
        />
        <Field
          className={`profile__input ${touched.name && errors.name && 'profile__input_onError'}`}
          labelStyle="profile__label"
          errorStyle="profile__error"
          name="email"
          type="email"
          label="E-mail"
          formik={formik}
        />

        <div className="profile__submit-area">
          <p className="profile__submit-error">При обновлении профиля произошла ошибка.</p>
          <button
            className={`profile__submit-button ${disabled && 'profile__submit-button_disabled'}`}
            type="submit"
            aria-label="Редактировать"
            disabled={disabled}
          >
            Редактировать
          </button>
          <Link to={'/'} className="profile__link" aria-label="Выйти из аккаунта">
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </>
  );
};

export default Profile;
