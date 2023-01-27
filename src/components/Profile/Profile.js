import './Profile.css';
import Field from '../Field/Field';
import Container from '../Container/Container';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  return (
    <>
      <Header loggedIn={true} />
      <form className="profile__form page__element">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <Field
          name="name"
          type="text"
          label="Имя"
          labelStyle="profile__label"
          inputStyle="profile__input"
          value="Виталий"
          errtext="Что-то пошло не так..."
          errorStyle="profile__error"
        />
        <Field
          name="Email"
          type="email"
          label="E-mail"
          labelStyle="profile__label"
          inputStyle="profile__input"
          value="pochta@yandex.ru"
          errorStyle="profile__error"
        />

        <div className="profile__submit-area">
          <p className="profile__submit-error">При обновлении профиля произошла ошибка.</p>
          <button
            className={`profile__submit-button ${
              props.disabled && 'profile__submit-button_disabled'
            }`}
            type="submit"
          >
            Редактировать
          </button>
          <Link to={'/'} className="profile__link">
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </>
  );
};

export default Profile;
