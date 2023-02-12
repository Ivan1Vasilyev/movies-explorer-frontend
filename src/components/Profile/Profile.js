import './Profile.css';
import Field from '../Field/Field';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import useErrorShielding from '../../hooks/useErrorShielding';

const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { formik, disabled } = useForm({ name: '', email: '' }, props.onSubmit);
  const { touched, errors, resetForm } = formik;
  const { isSubmitted, handleSubmit } = useErrorShielding(formik);

  useEffect(() => {
    resetForm({ values: { name: currentUser.name, email: currentUser.email } });
  }, [currentUser]);

  return (
    <>
      <Header loggedIn={props.loggedIn} place="account" />
      <form className="profile page__element" onSubmit={handleSubmit}>
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
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
          className={`profile__input ${touched.email && errors.email && 'profile__input_onError'}`}
          labelStyle="profile__label"
          errorStyle="profile__error"
          name="email"
          type="email"
          label="E-mail"
          formik={formik}
        />

        <div className="profile__submit-area">
          <p
            className={`profile__submit-info ${
              props.errorMessage && 'profile__submit-info_onError'
            }`}
          >
            {isSubmitted && (props.errorMessage || 'Данные профиля обновлены')}
          </p>
          <button
            className={`profile__submit-button ${disabled && 'profile__submit-button_disabled'}`}
            type="submit"
            aria-label="Редактировать"
            disabled={disabled}
          >
            Редактировать
          </button>
          <Link
            to={'/'}
            onClick={props.onLogout}
            className="profile__link"
            aria-label="Выйти из аккаунта"
          >
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </>
  );
};

export default Profile;
