import './FilterCheckbox.css';

const FilterCheckbox = () => (
  <div className="checkbox searchform__checkbox">
    <label className="checkbox__label">
      <input className="checkbox__button" type="checkbox" />
    </label>
    <p className="checkbox__caption">Короткометражки</p>
  </div>
);
export default FilterCheckbox;
