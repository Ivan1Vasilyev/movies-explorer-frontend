import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => (
  <section className="searchform">
    <input placeholder="Фильм" className="searchform__input" />
    <button className="searchform__submit" type="button" aria-label="Найти">
      Найти
    </button>
    <FilterCheckbox />
  </section>
);
export default SearchForm;
