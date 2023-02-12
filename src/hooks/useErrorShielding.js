import { useEffect, useState } from 'react';

const useErrorShielding = (formik) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { dirty, values } = formik;

  const handleSubmit = (data) => {
    setIsSubmitted(true);
    return formik.handleSubmit(data);
  };

  useEffect(() => {
    if (dirty) setIsSubmitted(false);
  }, [values]);

  return { isSubmitted, setIsSubmitted, handleSubmit };
};

export default useErrorShielding;
