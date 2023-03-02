import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useSearchForm from '../../hooks/useSearchForm';
import { useCallback, useEffect } from 'react';

const SearchForm = ({ isOnlyShorts, setIsOnlyShorts, keyWord, setKeyWord }) => {
  const { value, setValue, isSearchEmpty, handleChange, handleSubmit } = useSearchForm(setKeyWord);

  useEffect(() => {
    if (keyWord) setValue(keyWord);
  }, [keyWord]);

  const toggleFilter = useCallback((e) => setIsOnlyShorts(e.target.checked), []);

  return (
    <form className="searchform" onSubmit={handleSubmit}>
      <input
        name="movie"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Фильм"
        className="searchform__input"
      />
      <span className="searchform__error">{isSearchEmpty && 'Введите ключевое слово'}</span>
      <button className="searchform__submit" type="submit" aria-label="Найти">
        Найти
      </button>
      <FilterCheckbox toggler={toggleFilter} value={isOnlyShorts} />
    </form>
  );
};
export default SearchForm;
