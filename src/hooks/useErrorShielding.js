import { useEffect, useState } from 'react';

const useErrorShielding = (onSubmit) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlerSubmit = (data) => {
    setIsSubmitted(true);
    return onSubmit(data);
  };

  useEffect(() => {
    if (isSubmitted) setIsSubmitted(false);
  }, []);

  return { isSubmitted, handlerSubmit };
};

export default useErrorShielding;
