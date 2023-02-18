import './Popup.css';
import image from '../../images/error.svg';
import { useEffect } from 'react';

const Popup = ({ isOpen, onClose, errorMessage }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [isOpen]);

  const handleClickClosePopup = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={handleClickClosePopup}>
      <div className="popup__container">
        <img className="popup__image" src={image} alt="Ошибка" />
        <h3 className="popup__title">Что-то пошло не так!</h3>
        <p className="popup__message">
          {errorMessage}
          {/* Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз */}
        </p>
        <button
          className="popup__close-icon"
          type="button"
          aria-label="Закрыть"
          onClick={handleClickClosePopup}
        ></button>
      </div>
    </div>
  );
};

export default Popup;
