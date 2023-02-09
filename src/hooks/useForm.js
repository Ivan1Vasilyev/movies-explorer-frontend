import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const errorMessages = {
  required: 'Заполните это поле',
  min: 'Должно быть 2 символа или больше',
  max: 'Должно быть 30 символов или меньше',
  name: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
  email: 'Введите корректный email',
  password: 'Пароль должен содержать 4 символа или больше',
};

const validators = {
  name: Yup.string()
    .min(2, errorMessages.min)
    .max(30, errorMessages.max)
    .matches(/^[-_\sa-zа-я]+$/i, errorMessages.name)
    .required(errorMessages.required),
  email: Yup.string().email(errorMessages.email).required(errorMessages.required),
  password: Yup.string().min(4, errorMessages.password).required(errorMessages.required),
};

const useForm = (inputs, submitHandler) => {
  const [disabled, setDisabled] = useState(true);

  const formik = useFormik({
    initialValues: inputs,
    validationSchema: Yup.object(
      Object.keys(inputs).reduce((acc, item) => ({ ...acc, [item]: validators[item] }), {}),
    ),
    onSubmit: (values) => {
      setDisabled(true);
      return submitHandler(values);
    },
  });

  useEffect(() => {
    formik.isValid && formik.dirty ? setDisabled(false) : setDisabled(true);
  }, [formik.dirty, formik.isValid, formik.isValidating]);

  return { formik, disabled };
};

export default useForm;
