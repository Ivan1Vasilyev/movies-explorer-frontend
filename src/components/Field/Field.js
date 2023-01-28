import './Field.css';

const Field = ({ name, label, labelStyle, onError, errtext, inputStyle, errorStyle, ...props }) => (
  <>
    {label && (
      <label className={labelStyle} htmlFor={name}>
        {label}
      </label>
    )}
    <input
      className={`field__input ${onError && 'field__input_onError'} ${inputStyle}`}
      name={name}
      {...props}
    />
    <span className={`field__error ${errorStyle}`}>{errtext}</span>
  </>
);

export default Field;
