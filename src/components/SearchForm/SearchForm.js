import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Field from '../Field/Field';
import useForm from '../../hooks/useForm';

const SearchForm = (props) => {
  const { formik } = useForm({ movie: '' }, props.onSubmit);

  return (
    <section className="searchform">
      <Field placeholder="Фильм" className="searchform__input" name="movie" formik={formik} />
      <button className="searchform__submit" type="button" aria-label="Найти">
        Найти
      </button>
      <FilterCheckbox />
    </section>
  );
};
export default SearchForm;
