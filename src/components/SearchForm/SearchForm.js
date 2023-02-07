import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Field from '../Field/Field';
import { useEffect, useState } from 'react';

const SearchForm = () => {
  const [value, setValue] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  useEffect(() => {
    if (value !== '') setErrorText('');
  }, [value]);

  const handleSubmit = () => {
    if (value === '') setErrorText('Нужно ввести ключевое слово');
  };

  return (
    <section className="searchform">
      <Field
        placeholder="Фильм"
        inputStyle="searchform__input"
        value={value}
        onChange={handleChange}
        errtext={errorText}
        errorStyle={''}
      />
      <button
        className="searchform__submit"
        type="button"
        aria-label="Найти"
        onClick={handleSubmit}
      >
        Найти
      </button>
      <FilterCheckbox />
    </section>
  );
};
export default SearchForm;
