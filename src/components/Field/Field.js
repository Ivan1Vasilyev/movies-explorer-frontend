import './Field.css';

const Field = ({ formik, name, label, labelStyle, errorStyle, ...props }) => (
  <>
    {label && (
      <label className={labelStyle} htmlFor={name}>
        {label}
      </label>
    )}
    <input
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onFocus={formik.handleBlur}
      {...props}
    />
    <span className={`field__error${errorStyle ? ` ${errorStyle}` : ''}`}>
      {formik.touched[name] ? formik.errors[name] : ''}
    </span>
  </>
);

export default Field;
