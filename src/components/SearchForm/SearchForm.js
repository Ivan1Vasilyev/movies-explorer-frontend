import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useSearchForm from '../../hooks/useSearchForm';
import { useCallback } from 'react';

const SearchForm = ({ filterOn, setFilterOn, keyWord, setKeyWord }) => {
  const { value, isSearchEmpty, handleChange, handleSubmit } = useSearchForm(setKeyWord, keyWord);

  const toggleFilter = useCallback((e) => setFilterOn(e.target.checked), []);

  return (
    <form className="searchform" onSubmit={handleSubmit}>
      <input
        name="movie"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Найти фильмы по ключевому слову"
        className="searchform__input"
      />
      <span className="searchform__error">{isSearchEmpty && 'Введите ключевое слово'}</span>
      <button className="searchform__submit" type="submit" aria-label="Найти">
        Найти
      </button>
      <FilterCheckbox toggler={toggleFilter} value={filterOn} />
    </form>
  );
};
export default SearchForm;
